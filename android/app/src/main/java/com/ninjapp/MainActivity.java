package com.ninjapp;

import android.content.res.Configuration;
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
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

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

    // ── Lifecycle ──────────────────────────────────────────────────────────

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (getResources().getConfiguration().orientation != Configuration.ORIENTATION_LANDSCAPE) {
            Toast.makeText(this, "Pon el dispositivo en horizontal (landscape)", Toast.LENGTH_LONG).show();
        }

        setupViews();
        startShell();
        setupGuideWebView();
        setupDivider();
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
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);

        guideWebView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
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
        }, "TermuxBridge");

        guideWebView.loadUrl("https://illuminatiadmin.github.io/NINJApp/?embed");
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
