package com.example.yenos.ranlee;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;

public class MainActivity extends Activity {
    WebView webview;
    Button backBtn;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
//        ActionBar actionBar = getActionBar();
//        actionBar.hide();

        webview = (WebView)findViewById(R.id.webView);
//        backBtn = (Button)findViewById(R.id.button);


        webview.setWebViewClient(new WebClient()); // 응룡프로그램에서 직접 url 처리
        WebSettings set = webview.getSettings();
        set.setJavaScriptEnabled(true);
        set.setBuiltInZoomControls(true);
        webview.loadUrl("http://goyaaaaaaaa.xyz:50000");


    }
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event){
        if((keyCode == KeyEvent.KEYCODE_BACK) && webview.canGoBack()){
            webview.loadUrl("http://goyaaaaaaaa.xyz:50000");
            return true;
        }
        return super.onKeyDown(keyCode,event);
    }


    class WebClient extends WebViewClient {
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            view.loadUrl(url);
            return true;
        }
    }

}
