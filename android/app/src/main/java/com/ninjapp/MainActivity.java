package com.ninjapp;

import android.content.res.Configuration;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import termux.terminal.TerminalSession;
import termux.terminal.TerminalView;
import termux.terminal.TerminalEmulator;

import java.io.File;
import java.util.Map;
import java.util.HashMap;

public class MainActivity extends AppCompatActivity {

    private TerminalView terminalView;
    private TerminalSession terminalSession;
    private WebView guideWebView;
    private View divider;
    private boolean dividerDragging = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Force landscape
        if (getResources().getConfiguration().orientation != Configuration.ORIENTATION_LANDSCAPE) {
            Toast.makeText(this, "Pon el dispositivo en horizontal (landscape)", Toast.LENGTH_LONG).show();
        }

        setupTerminal();
        setupGuideWebView();
        setupDivider();
    }

    private void setupTerminal() {
        terminalView = findViewById(R.id.terminal_view);

        // Create a terminal session with a shell
        String[] env = new String[]{
            "TERM=xterm-256color",
            "HOME=" + getFilesDir().getAbsolutePath(),
            "PATH=" + System.getenv("PATH") + ":/system/bin:/system/xbin"
        };

        File workingDir = getFilesDir();

        terminalSession = new TerminalSession(
            "/system/bin/sh",
            new String[]{"--login"},
            env,
            workingDir,
            null
        );

        terminalView.attachSession(terminalSession);

        // Initialize shell with welcome message
        terminalSession.write("echo '>_ Terminal NINJApp listo'\n");
        terminalSession.write("echo 'Ejecuta los comandos que el asistente te indique.'\n");
        terminalSession.write("echo ''\n");
        terminalSession.write("PS1='└──╼ '\n");

        // Set terminal text size
        terminalView.setTextSize(12);
    }

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

        // JavaScript bridge to send commands to terminal
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

        // Load the NINJApp guide from GitHub Pages
        // The guide loads the main page which shows a simplified version for the right pane
        guideWebView.loadUrl("https://illuminatiadmin.github.io/NINJApp/");
    }

    private void setupDivider() {
        divider = findViewById(R.id.divider);
        final View terminalPanel = findViewById(R.id.terminal_panel);
        final View guidePanel = findViewById(R.id.guide_panel);
        final LinearLayout rootLayout = findViewById(R.id.root_layout);

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

                        // Clamp between 30% and 70%
                        float minX = screenWidth * 0.3f;
                        float maxX = screenWidth * 0.7f;
                        touchX = Math.max(minX, Math.min(maxX, touchX));

                        // Convert to weight (0-10 scale)
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
