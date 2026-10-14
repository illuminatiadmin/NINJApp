package com.ninjapp;

import android.os.Bundle;
import android.text.Html;
import android.text.method.ScrollingMovementMethod;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import org.json.JSONArray;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {

    private TextView terminalOutput;
    private EditText terminalInput;
    private ScrollView terminalScroll;
    private Button terminalSend;
    private WebView guideWebView;
    private View divider;
    private boolean dividerDragging = false;

    private Process shellProcess;
    private OutputStream shellStdin;
    private BufferedReader shellStdout;
    private Thread shellReaderThread;
    private boolean shellRunning = false;

    private File webDir; // copia de la web en almacenamiento interno (actualizable)
    private static final String RAW_BASE =
        "https://raw.githubusercontent.com/illuminatiadmin/NINJApp/main/";
    private static final String PREFS = "ninjapp_prefs";

    // ── Lifecycle ──────────────────────────────────────────────────────────

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ensureWebContent();
        setupViews();
        startShell();
        setupGuideWebView();
        setupDivider();
        setupTerminalToggle();
    }

    // ── Terminal desplegable ─────────────────────────────────────────────────

    private boolean terminalOpen = false;

    private void setupTerminalToggle() {
        Button toggle = findViewById(R.id.terminal_toggle);
        if (toggle != null) toggle.setOnClickListener(v -> showTerminal(!terminalOpen));
    }

    /** Muestra u oculta el panel de la terminal, dando el ancho restante a la
     *  Academia. La terminal arranca cerrada para no ocupar espacio. */
    private void showTerminal(boolean open) {
        terminalOpen = open;
        View terminalPanel = findViewById(R.id.terminal_panel);
        View guidePanel = findViewById(R.id.guide_panel);
        View div = findViewById(R.id.divider);
        Button toggle = findViewById(R.id.terminal_toggle);

        LinearLayout.LayoutParams tp = (LinearLayout.LayoutParams) terminalPanel.getLayoutParams();
        LinearLayout.LayoutParams gp = (LinearLayout.LayoutParams) guidePanel.getLayoutParams();
        tp.weight = open ? 5f : 0f;
        gp.weight = open ? 5f : 10f;
        terminalPanel.setLayoutParams(tp);
        guidePanel.setLayoutParams(gp);
        terminalPanel.setVisibility(open ? View.VISIBLE : View.GONE);
        if (div != null) div.setVisibility(open ? View.VISIBLE : View.GONE);
        if (toggle != null) toggle.setText(open ? "✕ Cerrar" : "⌨ Terminal");
        if (open) terminalInput.requestFocus();
    }

    // ── Contenido web (offline + actualizable) ───────────────────────────────

    /** Copia la web empaquetada a almacenamiento interno la primera vez. Así
     *  siempre se carga desde la misma ruta (origen estable para localStorage)
     *  y el botón "Actualizar" puede reemplazar los archivos sin reinstalar. */
    private void ensureWebContent() {
        webDir = new File(getFilesDir(), "web");
        File index = new File(webDir, "index.html");
        if (!index.exists()) {
            copyAssetDir("web", webDir);
            // Guarda la versión de contenido empaquetada como versión local base
            try {
                File vf = new File(webDir, "version.json");
                if (vf.exists()) {
                    JSONObject v = new JSONObject(readFile(vf));
                    saveContentVersion(v.optInt("contentVersion", 0));
                }
            } catch (Exception ignored) {}
        }
    }

    private int localContentVersion() {
        return getSharedPreferences(PREFS, MODE_PRIVATE).getInt("contentVersion", 0);
    }
    private void saveContentVersion(int v) {
        getSharedPreferences(PREFS, MODE_PRIVATE).edit().putInt("contentVersion", v).apply();
    }

    // ── Views ──────────────────────────────────────────────────────────────

    private void setupViews() {
        terminalOutput = findViewById(R.id.terminal_output);
        terminalInput = findViewById(R.id.terminal_input);
        terminalScroll = findViewById(R.id.terminal_scroll);
        terminalSend = findViewById(R.id.terminal_send);

        terminalOutput.setMovementMethod(new ScrollingMovementMethod());
        terminalOutput.setTextIsSelectable(true);

        terminalInput.setOnEditorActionListener((v, actionId, event) -> {
            if (actionId == android.view.inputmethod.EditorInfo.IME_ACTION_SEND
                    || (event != null && event.getKeyCode() == KeyEvent.KEYCODE_ENTER)) {
                sendCommand(terminalInput.getText().toString());
                return true;
            }
            return false;
        });

        terminalInput.setOnKeyListener((v, keyCode, event) -> {
            if (event.getAction() == KeyEvent.ACTION_DOWN && keyCode == KeyEvent.KEYCODE_ENTER) {
                sendCommand(terminalInput.getText().toString());
                return true;
            }
            return false;
        });

        terminalSend.setOnClickListener(v -> sendCommand(terminalInput.getText().toString()));
    }

    // ── Shell (ProcessBuilder) ─────────────────────────────────────────────

    private void startShell() {
        appendOutput(">_ Terminal NINJApp listo\n");
        appendOutput("Ejecuta los comandos que el asistente te indique.\n\n");

        new Thread(() -> {
            try {
                ProcessBuilder pb = new ProcessBuilder();
                pb.command("/system/bin/sh");
                pb.redirectErrorStream(true);
                pb.directory(getFilesDir());

                shellProcess = pb.start();
                shellStdin = shellProcess.getOutputStream();
                shellStdout = new BufferedReader(new InputStreamReader(shellProcess.getInputStream(), StandardCharsets.UTF_8));
                shellRunning = true;

                // Send initial shell setup
                writeToShell("export PS1='└──╼ '\n");

                // Reader thread
                shellReaderThread = new Thread(() -> {
                    char[] buffer = new char[4096];
                    try {
                        int read;
                        while (shellRunning && (read = shellStdout.read(buffer, 0, buffer.length)) != -1) {
                            String chunk = new String(buffer, 0, read);
                            runOnUiThread(() -> appendOutput(chunk));
                        }
                    } catch (Exception ignored) {
                    }
                });
                shellReaderThread.setDaemon(true);
                shellReaderThread.start();

            } catch (Exception e) {
                runOnUiThread(() -> {
                    appendOutput("Error al iniciar shell: " + e.getMessage() + "\n");
                    appendOutput("Asegúrate de que el dispositivo tiene un shell compatible.\n");
                });
            }
        }).start();
    }

    private void writeToShell(String command) {
        if (shellStdin != null && shellRunning) {
            try {
                shellStdin.write(command.getBytes(StandardCharsets.UTF_8));
                shellStdin.flush();
            } catch (Exception ignored) {}
        }
    }

    private void sendCommand(String command) {
        if (command == null || command.isEmpty()) return;
        if (!terminalOpen) showTerminal(true); // abre la terminal para ver la salida
        appendOutput("└──╼ " + command + "\n");
        writeToShell(command + "\n");
        terminalInput.setText("");
        terminalInput.requestFocus();
    }

    private void appendOutput(String text) {
        terminalOutput.append(Html.fromHtml(
            android.text.TextUtils.htmlEncode(text)
                .replace("\n", "<br>")
                .replace(" ", "&nbsp;"),
            Html.FROM_HTML_MODE_LEGACY
        ));
        terminalScroll.post(() -> terminalScroll.fullScroll(View.FOCUS_DOWN));
    }

    // ── WebView / JavaScript bridge ────────────────────────────────────────

    private void setupGuideWebView() {
        guideWebView = findViewById(R.id.guide_webview);

        WebSettings settings = guideWebView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);
        settings.setBuiltInZoomControls(true);
        settings.setDisplayZoomControls(false);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        // Contenido empaquetado dentro del APK: funciona sin internet
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);

        guideWebView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                // Enlaces externos (http/https) -> navegador del sistema.
                // Contenido local (file://) -> se queda en la app.
                if (url != null && (url.startsWith("http://") || url.startsWith("https://"))) {
                    try {
                        startActivity(new android.content.Intent(
                            android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url)));
                        return true;
                    } catch (Exception e) {
                        return true;
                    }
                }
                view.loadUrl(url);
                return true;
            }
        });

        guideWebView.setWebChromeClient(new WebChromeClient());

        guideWebView.addJavascriptInterface(new Object() {
            @android.webkit.JavascriptInterface
            public void runCommand(String command) {
                if (command != null && !command.isEmpty()) {
                    runOnUiThread(() -> sendCommand(command));
                }
            }

            @android.webkit.JavascriptInterface
            public void runCommands(String[] commands) {
                if (commands != null) {
                    for (String cmd : commands) {
                        runOnUiThread(() -> sendCommand(cmd));
                    }
                }
            }

            @android.webkit.JavascriptInterface
            public void updateContent() {
                checkForUpdates();
            }
        }, "TermuxBridge");

        // Carga la app COMPLETA desde almacenamiento interno (copiada del APK la
        // primera vez, o actualizada por el botón "Actualizar") → sin internet.
        // Sin ?embed: así aparece el menú inferior y todas las secciones.
        guideWebView.loadUrl(android.net.Uri.fromFile(new File(webDir, "index.html")).toString());
    }

    // ── Draggable divider ──────────────────────────────────────────────────

    private void setupDivider() {
        divider = findViewById(R.id.divider);
        final View terminalPanel = findViewById(R.id.terminal_panel);
        final View guidePanel = findViewById(R.id.guide_panel);

        divider.setOnTouchListener((v, event) -> {
            switch (event.getAction()) {
                case android.view.MotionEvent.ACTION_DOWN:
                    dividerDragging = true;
                    v.setAlpha(0.8f);
                    return true;
                case android.view.MotionEvent.ACTION_MOVE:
                    if (dividerDragging) {
                        int screenWidth = getWindow().getDecorView().getWidth();
                        float touchX = event.getRawX();

                        float minX = screenWidth * 0.3f;
                        float maxX = screenWidth * 0.7f;
                        touchX = Math.max(minX, Math.min(maxX, touchX));

                        float weight = (touchX / screenWidth) * 10f;
                        float termWeight = weight;
                        float guideWeight = 10f - weight;

                        LinearLayout.LayoutParams termParams =
                            (LinearLayout.LayoutParams) terminalPanel.getLayoutParams();
                        termParams.weight = termWeight;
                        terminalPanel.setLayoutParams(termParams);

                        LinearLayout.LayoutParams guideParams =
                            (LinearLayout.LayoutParams) guidePanel.getLayoutParams();
                        guideParams.weight = guideWeight;
                        guidePanel.setLayoutParams(guideParams);

                        return true;
                    }
                    return false;
                case android.view.MotionEvent.ACTION_UP:
                    dividerDragging = false;
                    v.setAlpha(0.3f);
                    v.performClick();
                    return true;
            }
            return false;
        });
    }

    // ── Actualización de contenido + aviso de nueva app ──────────────────────

    private void checkForUpdates() {
        runOnUiThread(() -> Toast.makeText(this, "Buscando actualización…", Toast.LENGTH_SHORT).show());
        new Thread(() -> {
            try {
                JSONObject remote = new JSONObject(httpGet(RAW_BASE + "version.json"));
                int remoteContent = remote.optInt("contentVersion", 0);

                // 1) Contenido: solo si el remoto es MÁS NUEVO (nunca degrada)
                if (remoteContent > localContentVersion()) {
                    JSONArray files = remote.getJSONArray("files");
                    File staging = new File(getFilesDir(), "web_new");
                    deleteRecursive(staging);
                    staging.mkdirs();
                    for (int i = 0; i < files.length(); i++) {
                        String rel = files.getString(i);
                        byte[] data = httpGetBytes(RAW_BASE + rel);
                        File out = new File(staging, rel);
                        if (out.getParentFile() != null) out.getParentFile().mkdirs();
                        writeBytes(out, data);
                    }
                    // Descarga completa OK → fusiona sobre webDir (conserva iconos)
                    copyMerge(staging, webDir);
                    deleteRecursive(staging);
                    saveContentVersion(remoteContent);
                    runOnUiThread(() -> {
                        Toast.makeText(this, "✓ Contenido actualizado", Toast.LENGTH_LONG).show();
                        guideWebView.loadUrl(android.net.Uri.fromFile(new File(webDir, "index.html")) + "?embed");
                    });
                } else {
                    runOnUiThread(() -> Toast.makeText(this, "Ya tienes el contenido más reciente", Toast.LENGTH_SHORT).show());
                }

                // 2) App (APK): avisar si hay una versión nueva del programa
                checkAppVersion(remote);

            } catch (Exception e) {
                runOnUiThread(() -> Toast.makeText(this,
                    "No se pudo actualizar (revisa tu conexión)", Toast.LENGTH_LONG).show());
            }
        }).start();
    }

    private void checkAppVersion(JSONObject remote) {
        try {
            int remoteCode = remote.optInt("appVersionCode", 0);
            String apkUrl = remote.optString("apkUrl", "");
            int localCode = getPackageManager().getPackageInfo(getPackageName(), 0).versionCode;
            if (remoteCode > localCode && !apkUrl.isEmpty()) {
                runOnUiThread(() -> new androidx.appcompat.app.AlertDialog.Builder(this)
                    .setTitle("Nueva versión de la app")
                    .setMessage("Hay una versión nueva de NINJApp. Se abrirá la página de descarga; confirma la instalación cuando Android lo pida.")
                    .setPositiveButton("Descargar", (d, w) -> {
                        try {
                            startActivity(new android.content.Intent(
                                android.content.Intent.ACTION_VIEW, android.net.Uri.parse(apkUrl)));
                        } catch (Exception ignored) {}
                    })
                    .setNegativeButton("Ahora no", null)
                    .show());
            }
        } catch (Exception ignored) {}
    }

    // ── Helpers de red y archivos ────────────────────────────────────────────

    private String httpGet(String urlStr) throws Exception {
        return new String(httpGetBytes(urlStr), StandardCharsets.UTF_8);
    }

    private byte[] httpGetBytes(String urlStr) throws Exception {
        HttpURLConnection c = (HttpURLConnection) new URL(urlStr).openConnection();
        c.setConnectTimeout(10000);
        c.setReadTimeout(20000);
        c.setRequestProperty("User-Agent", "NINJApp");
        c.connect();
        int code = c.getResponseCode();
        if (code != 200) { c.disconnect(); throw new Exception("HTTP " + code); }
        try (InputStream in = c.getInputStream(); ByteArrayOutputStream bo = new ByteArrayOutputStream()) {
            byte[] buf = new byte[8192]; int n;
            while ((n = in.read(buf)) != -1) bo.write(buf, 0, n);
            return bo.toByteArray();
        } finally { c.disconnect(); }
    }

    private void copyAssetDir(String assetPath, File destDir) {
        try {
            String[] items = getAssets().list(assetPath);
            if (items == null || items.length == 0) { // es archivo
                copyAssetFile(assetPath, destDir);
                return;
            }
            if (!destDir.exists()) destDir.mkdirs();
            for (String item : items) {
                String child = assetPath + "/" + item;
                String[] sub = getAssets().list(child);
                if (sub != null && sub.length > 0) copyAssetDir(child, new File(destDir, item));
                else copyAssetFile(child, new File(destDir, item));
            }
        } catch (Exception ignored) {}
    }

    private void copyAssetFile(String assetPath, File destFile) {
        try {
            if (destFile.getParentFile() != null) destFile.getParentFile().mkdirs();
            try (InputStream in = getAssets().open(assetPath); OutputStream out = new FileOutputStream(destFile)) {
                byte[] buf = new byte[8192]; int n;
                while ((n = in.read(buf)) != -1) out.write(buf, 0, n);
            }
        } catch (Exception ignored) {}
    }

    private void copyMerge(File fromDir, File toDir) {
        File[] kids = fromDir.listFiles();
        if (kids == null) return;
        if (!toDir.exists()) toDir.mkdirs();
        for (File k : kids) {
            File dest = new File(toDir, k.getName());
            if (k.isDirectory()) copyMerge(k, dest);
            else {
                try (InputStream in = new java.io.FileInputStream(k); OutputStream out = new FileOutputStream(dest)) {
                    byte[] buf = new byte[8192]; int n;
                    while ((n = in.read(buf)) != -1) out.write(buf, 0, n);
                } catch (Exception ignored) {}
            }
        }
    }

    private void writeBytes(File f, byte[] data) throws Exception {
        try (OutputStream out = new FileOutputStream(f)) { out.write(data); }
    }

    private String readFile(File f) throws Exception {
        try (InputStream in = new java.io.FileInputStream(f); ByteArrayOutputStream bo = new ByteArrayOutputStream()) {
            byte[] buf = new byte[8192]; int n;
            while ((n = in.read(buf)) != -1) bo.write(buf, 0, n);
            return new String(bo.toByteArray(), StandardCharsets.UTF_8);
        }
    }

    private void deleteRecursive(File f) {
        if (f == null || !f.exists()) return;
        if (f.isDirectory()) {
            File[] kids = f.listFiles();
            if (kids != null) for (File k : kids) deleteRecursive(k);
        }
        f.delete();
    }

    // ── Cleanup ────────────────────────────────────────────────────────────

    @Override
    protected void onDestroy() {
        super.onDestroy();
        shellRunning = false;
        if (shellProcess != null) {
            shellProcess.destroy();
        }
        if (guideWebView != null) {
            guideWebView.destroy();
        }
    }

    @Override
    public void onBackPressed() {
        if (guideWebView != null && guideWebView.canGoBack()) {
            guideWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
