package com.ninjapp;

import android.content.res.Configuration;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.termux.view.TerminalView;
import com.termux.terminal.TerminalSession;
import com.termux.terminal.TerminalSessionClient;
import com.termux.view.TerminalViewClient;

public class MainActivity extends AppCompatActivity {

    private TerminalView terminalView;
    private TerminalSession terminalSession;
    private WebView guideWebView;
    private View divider;
    private boolean dividerDragging = false;

    // ── TerminalSessionClient ──────────────────────────────────────────────

    private final TerminalSessionClient terminalSessionClient = new TerminalSessionClient() {
        @Override public void onTextChanged(TerminalSession changedSession) {}
        @Override public void onTitleChanged(TerminalSession changedSession) {}
        @Override public void onSessionFinished(TerminalSession finishedSession) {}
        @Override public void onCopyTextToClipboard(TerminalSession session, String text) {}
        @Override public void onPasteTextFromClipboard(TerminalSession session) {}
        @Override public void onBell(TerminalSession session) {}
        @Override public void onColorsChanged(TerminalSession session) {}
        @Override public void onTerminalCursorStateChange(boolean state) {}
        @Override public Integer getTerminalCursorStyle() { return null; }
        @Override public void logError(String tag, String message) {}
        @Override public void logWarn(String tag, String message) {}
        @Override public void logInfo(String tag, String message) {}
        @Override public void logDebug(String tag, String message) {}
        @Override public void logVerbose(String tag, String message) {}
        @Override public void logStackTraceWithMessage(String tag, String message, Exception e) {}
        @Override public void logStackTrace(String tag, Exception e) {}
    };

    // ── TerminalViewClient ─────────────────────────────────────────────────

    private final TerminalViewClient terminalViewClient = new TerminalViewClient() {
        @Override public float onScale(float scale) { return scale; }
        @Override public void onSingleTapUp(MotionEvent e) {}
        @Override public boolean shouldBackButtonBeMappedToEscape() { return false; }
        @Override public boolean shouldEnforceCharBasedInput() { return false; }
        @Override public boolean shouldUseCtrlSpaceWorkaround() { return false; }
        @Override public boolean isTerminalViewSelected() { return true; }
        @Override public void copyModeChanged(boolean copyMode) {}
        @Override public boolean onKeyDown(int keyCode, KeyEvent e, TerminalSession session) { return false; }
        @Override public boolean onKeyUp(int keyCode, KeyEvent e) { return false; }
        @Override public boolean onLongPress(MotionEvent event) { return false; }
        @Override public boolean readControlKey() { return false; }
        @Override public boolean readAltKey() { return false; }
        @Override public boolean readShiftKey() { return false; }
        @Override public boolean readFnKey() { return false; }
        @Override public boolean onCodePoint(int codePoint, boolean ctrlDown, TerminalSession session) { return false; }
        @Override public void onEmulatorSet() {
            terminalSession.write(
                "echo '>_ Terminal NINJApp listo'\n" +
                "echo 'Ejecuta los comandos que el asistente te indique.'\n" +
                "echo ''\n" +
                "PS1='└──╼ '\n"
            );
        }
        @Override public void logError(String tag, String message) {}
        @Override public void logWarn(String tag, String message) {}
        @Override public void logInfo(String tag, String message) {}
        @Override public void logDebug(String tag, String message) {}
        @Override public void logVerbose(String tag, String message) {}
        @Override public void logStackTraceWithMessage(String tag, String message, Exception e) {}
        @Override public void logStackTrace(String tag, Exception e) {}
    };

    // ── Lifecycle ──────────────────────────────────────────────────────────

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (getResources().getConfiguration().orientation != Configuration.ORIENTATION_LANDSCAPE) {
            Toast.makeText(this, "Pon el dispositivo en horizontal (landscape)", Toast.LENGTH_LONG).show();
        }

        setupTerminal();
        setupGuideWebView();
        setupDivider();
    }

    // ── Terminal setup ─────────────────────────────────────────────────────

    private void setupTerminal() {
        terminalView = findViewById(R.id.terminal_view);

        String[] env = new String[]{
            "TERM=xterm-256color",
            "HOME=" + getFilesDir().getAbsolutePath(),
            "TMPDIR=" + getCacheDir().getAbsolutePath(),
            "PATH=/system/bin:/system/xbin:/sbin:/vendor/bin:/apex/com.android.runtime/bin"
        };

        terminalSession = new TerminalSession(
            "/system/bin/sh",
            getFilesDir().getAbsolutePath(),
            new String[]{"--login"},
            env,
            null,
            terminalSessionClient
        );

        terminalView.attachSession(terminalSession);
        terminalSession.updateTerminalSessionClient(terminalSessionClient);
        terminalView.setTerminalViewClient(terminalViewClient);
        terminalView.setTextSize(12);
        terminalView.requestFocus();
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
                if (terminalSession != null && command != null && !command.isEmpty()) {
                    terminalSession.write(command + "\n");
                }
            }

            @android.webkit.JavascriptInterface
            public void runCommands(String[] commands) {
                if (terminalSession != null && commands != null) {
                    for (String cmd : commands) {
                        terminalSession.write(cmd + "\n");
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
        if (terminalSession != null) {
            terminalSession.finishIfRunning();
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
