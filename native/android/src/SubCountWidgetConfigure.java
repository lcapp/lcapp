package net.livecounts;

/*import java.util.Random;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.nio.charset.Charset;

import org.json.JSONException;
import org.json.JSONObject;*/

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.RemoteViews;
import android.os.AsyncTask;
import android.os.Bundle;
import android.widget.Toast;
import android.app.Activity;
import android.widget.Button;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebSettings;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.WebViewClient;
import android.content.SharedPreferences;

import android.os.Bundle;
import org.apache.cordova.*;

public class SubCountWidgetConfigure extends CordovaActivity {
    int mAppWidgetId = AppWidgetManager.INVALID_APPWIDGET_ID;
    
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        
        setResult(RESULT_CANCELED);

        Intent intent = getIntent();
        Bundle extras = intent.getExtras();
        if (extras != null) {
            mAppWidgetId = extras.getInt(
                AppWidgetManager.EXTRA_APPWIDGET_ID,
                AppWidgetManager.INVALID_APPWIDGET_ID);
        }

        // If they gave us an intent without the widget id, just bail.
        if (mAppWidgetId == AppWidgetManager.INVALID_APPWIDGET_ID) {
            finish();
        }
         
        // Set by <content src="index.html" /> in config.xml
        //loadUrl("file:///android_asset/www/index2.html");
        setContentView(R.layout.config);
        WebView webview = (WebView) findViewById(R.id.webview);
        WebSettings webSettings = webview.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setAllowFileAccessFromFileURLs(true);
        webSettings.setAllowUniversalAccessFromFileURLs(true);
        webSettings.setUseWideViewPort(true);
        webSettings.setLoadWithOverviewMode(true);
        webview.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url.contains("done?")) {
                    // handle by yourself
                    String id = url.substring(url.indexOf("?") + 1, url.indexOf(";"));
                    String name = url.substring(url.indexOf(";") + 1);
                    //Toast.makeText(SubCountWidgetConfigure.this, "id: " + id + ", name: " + name, Toast.LENGTH_LONG).show();

                    SharedPreferences sharedPref = getSharedPreferences("prefs", 0);
                    SharedPreferences.Editor editor = sharedPref.edit();
                    editor.putString("widget" + mAppWidgetId + "id", id);
                    editor.putString("widget" + mAppWidgetId + "name", name);
                    editor.commit();
                    
                    /*final Context context = SubCountWidgetConfigure.this;
                    Intent firstUpdate = new Intent(context, SubCountWidgetProvider.class);
                    //int[] appWidgetIds = appWidgetManager.getAppWidgetIds(thisAppWidget);
                    firstUpdate.setAction("android.appwidget.action.APPWIDGET_UPDATE");
                    firstUpdate.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, mAppWidgetId);
                    context.sendBroadcast(firstUpdate);*/
                    
                    final Context context = SubCountWidgetConfigure.this;
                    Intent intent = new Intent(AppWidgetManager.ACTION_APPWIDGET_UPDATE, null, context, SubCountWidgetProvider.class);
                    intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, new int[] {mAppWidgetId});
                    sendBroadcast(intent);
                    
                    Intent resultValue = new Intent();
                    resultValue.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, mAppWidgetId);
                    setResult(RESULT_OK, resultValue);
                    finish();
                }
                // ...
                return false;
            }
        });
        webview.loadUrl("file:///android_asset/www/index2.html");
        //setContentView(webview);
        webview.requestFocus(View.FOCUS_DOWN);
        
        /*final Context context = SubCountWidgetConfigure.this;
        Toast.makeText(context, "Yeh rite", Toast.LENGTH_LONG).show();
        
        Intent resultValue = new Intent();
        resultValue.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, mAppWidgetId);
        setResult(RESULT_OK, resultValue);
        finish();*/
    }
}