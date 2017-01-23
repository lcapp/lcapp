package net.livecounts;

import java.util.Random;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.nio.charset.Charset;
import java.net.URLDecoder;
import java.io.UnsupportedEncodingException;
import java.text.NumberFormat;
import java.net.URLConnection;
import java.net.HttpURLConnection;

import org.json.JSONException;
import org.json.JSONObject;

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
import android.content.SharedPreferences;

public class SubCountWidgetProvider extends AppWidgetProvider {

        private static final String ACTION_CLICK = "ACTION_CLICK";

        @Override
        public void onUpdate(Context context, AppWidgetManager appWidgetManager,
                        int[] appWidgetIds) {

                // Get all ids
                //ComponentName thisWidget = new ComponentName(context,
                //                SubCountWidgetProvider.class);
                //int[] allWidgetIds = appWidgetManager.getAppWidgetIds(thisWidget);
                for (int widgetId : appWidgetIds) {
                    /*RemoteViews remoteViews = new RemoteViews(context.getPackageName(),
                                    R.layout.widget_layout);
                    //remoteViews.setTextViewText(R.id.subCount, getSubCount("UC-lHJZR3Gqxm24_Vd_AJ5Yw"));
                    updateSubCount(context, widgetId);
                    Intent intent = new Intent(context, SubCountWidgetProvider.class);
                    //intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
                    //int[] ids = {widgetId};
                    intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, widgetId);
                    PendingIntent pendingIntent = PendingIntent.getBroadcast(context,
                            widgetId, intent, PendingIntent.FLAG_UPDATE_CURRENT);
                    remoteViews.setOnClickPendingIntent(R.id.refresh, pendingIntent);
                    appWidgetManager.updateAppWidget(widgetId, remoteViews);*/
                    updateAppWidget(context, appWidgetManager, widgetId);
                }
        }
        
        @Override
        public void onReceive(Context context, Intent intent) {
            //Log.w("Stupid", "onReceive called");
            //Log.w("Hoyeah", "Action: " + intent.getAction());
            //Log.w("Hoyeah", "Context: " + context.toString());
            //AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
            if (intent.getAction() == null) {
                Bundle extras = intent.getExtras();
                if (extras != null) {
                    int widgetId = extras.getInt(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID);
                    // do something for the widget that has appWidgetId = widgetId
                    updateSubCount(context, widgetId);
                    //updateAppWidget(context, appWidgetManager, widgetId);
                    //Log.w("Stupid", "Successfully updated " + widgetId);
                }
            }
            else {
                super.onReceive(context, intent);
                //Log.w("Stupid", "That was dumb");
            }
        }
        
        public static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int widgetId) {
            //Log.w("Hoyeah", "updateAppWidget called on " + widgetId);
            //Log.w("Hoyeah", "Context: " + context.toString());
            RemoteViews remoteViews = new RemoteViews(context.getPackageName(),
                            R.layout.widget_layout);
            updateSubCount(context, widgetId, remoteViews);
            //Log.w("Hoyeah", "Sub count on " + widgetId + " retrieved");
            Intent intent = new Intent(context, SubCountWidgetProvider.class);
            intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, widgetId);
            PendingIntent pendingIntent = PendingIntent.getBroadcast(context,
                    widgetId, intent, PendingIntent.FLAG_UPDATE_CURRENT);
            remoteViews.setOnClickPendingIntent(R.id.refresh, pendingIntent);
            appWidgetManager.updateAppWidget(widgetId, remoteViews);
            //Log.w("Hoyeah", "updateAppWidget on " + widgetId + " done");
        }
        
        private static void updateSubCount(Context context, int widgetId)
        {
            //Log.w("Hoyeah", "updateSubCount called on " + widgetId);
            SharedPreferences prefs = context.getSharedPreferences("prefs", 0);
            String id = prefs.getString("widget" + widgetId + "id", "UC-lHJZR3Gqxm24_Vd_AJ5Yw");
            String name = prefs.getString("widget" + widgetId + "name", "PewDiePie");
            try {
                name = URLDecoder.decode(name, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                throw new AssertionError("UTF-8 is unknown");
            }
            
            RemoteViews remoteViews = new RemoteViews(context.getPackageName(),
                            R.layout.widget_layout);
            remoteViews.setTextViewText(R.id.channelTitle, name);
            remoteViews.setTextViewText(R.id.subCount, NumberFormat.getInstance().format(Integer.parseInt(getSubCount(id))));
            //Log.w("Beepo", "widgetId: " + widgetId + ", remoteViews: " + remoteViews);
            AppWidgetManager.getInstance(context).updateAppWidget(
                widgetId, remoteViews);
        }
        
        private static void updateSubCount(Context context, int widgetId, RemoteViews remoteViews)
        {
            //Log.w("Hoyeah", "2nd updateSubCount called on " + widgetId);
            //Log.w("Beepo", "context: " + context.toString() + ", widgetId: " + widgetId);
            SharedPreferences prefs = context.getSharedPreferences("prefs", 0);
            String id = prefs.getString("widget" + widgetId + "id", "UC-lHJZR3Gqxm24_Vd_AJ5Yw");
            String name = prefs.getString("widget" + widgetId + "name", "PewDiePie");
            try {
                name = URLDecoder.decode(name, "UTF-8");
            } catch (UnsupportedEncodingException e) {
                throw new AssertionError("UTF-8 is unknown");
            }
            //Log.w("Beepo", "id: " + id + ", name: " + name + ", widgetId: " + widgetId);
            
            remoteViews.setTextViewText(R.id.channelTitle, name);
            remoteViews.setTextViewText(R.id.subCount, NumberFormat.getInstance().format(Integer.parseInt(getSubCount(id))));
            //Log.w("Beepo", "widgetId: " + widgetId + ", remoteViews: " + remoteViews);
            AppWidgetManager.getInstance(context).updateAppWidget(
                widgetId, remoteViews);
        }

        private class JSONReader extends AsyncTask<String, Void, JSONObject> {
            private Exception exception;

            protected JSONObject doInBackground(String... urls) {
                try {
                    return readJsonFromUrl(urls[0]);
                } catch (Exception e) {
                    this.exception = e;

                    return null;
                }
            }

            protected void onPostExecute(JSONObject feed) {
                // TODO: check this.exception
                // TODO: do something with the feed
            }
                
            private String readAll(Reader rd) throws IOException {
                StringBuilder sb = new StringBuilder();
                int cp;
                while ((cp = rd.read()) != -1) {
                    sb.append((char) cp);
                }
                return sb.toString();
            }

            public JSONObject readJsonFromUrl(String url) throws IOException, JSONException {
                //Log.w("Ugh", "This is working");
                URLConnection connection = new URL(url).openConnection();
                HttpURLConnection httpConnection = (HttpURLConnection) connection;
                Log.w("Ugh", String.valueOf(httpConnection.getResponseCode()));
                InputStream is = connection.getInputStream();
                try {
                      BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
                      String jsonText = readAll(rd);
                      //Log.w("Dangit", jsonText);
                      JSONObject json = new JSONObject(jsonText);
                      return json;
                } finally {
                    is.close();
                }
            }
        }
        
        private class KeyProvider {
            private int index;
            private String[] keys;
            
            public KeyProvider() {
                index = 0;
                keys = new String[] { "AIzaSyCRtJ2uhgYe7p3J-QkC6kHsm7KZz0bDIok", "AIzaSyCo-PwQAtlrchgSAY0hLnE2HYSRhqdsPXk", "AIzaSyC7asPTom1oZVPmZu7UcttGNFvqzRWQiRM", "AIzaSyDmUVXdKMQfp1428NsX0GuBHEp3Hh6VnRQ", "AIzaSyB0uq8HHarCnpYG4pZxYPwE8wLAtM_gBN0", "AIzaSyCgp_Uc2jj1mAd7HW9AzAATt33rGkvttVQ", "AIzaSyDUUfmvtaHY3lQ11CbkF8gplSJSXwgLe2g", "AIzaSyDzUqDdCGrb5g5YU0fo0pB9QbqurkK3GSc", "AIzaSyBgcyeGD9VK-Nu2pnlP5VQaLWqYSIPWZRk", "AIzaSyAGry7aVXPytGcqt-GrOb4HkIXVGbuL4As", "AIzaSyAiWjUpPAvVy1fLj2VTJitH56Gs-2PBMLY", "AIzaSyA2bieaAnufzw9YNibt0R2WI14L8uU9tbw", "AIzaSyDpTfaINBOTi_1YgYSmk25DPS8ex-duZsQ", "AIzaSyAGFMcByfMdsbQbpK7FE8MfHLZNjMDIWsw", "AIzaSyCLuua085lVPXp0Jmqb_AIePC0hG66N_5U", "AIzaSyDGu5pdf-_0cNIZdNkcLKtdpn0UNulX7hU", "AIzaSyDY8suw3_q3zMX6ZDhdr7IDpPLQ6CbEsoY", "AIzaSyCE9cyVSRDrn0nCjO_ajRDSHXUr3yqLnT0", "AIzaSyACVbv1wiiFdYQsaMQkthBJAUi-Ek-ZNkc", "AIzaSyANLBp5fHf-XEsQnksu_-ygJMHviGQO7TY", "AIzaSyCQXeXdjhu5SKnvLJeYz9SgyKbzT8fnQko", "AIzaSyBlSrOJ-ajuFM4cRpbPbuBnI1Fn3BPFrbg", "AIzaSyC9jt3y7ygY5qTToSUEanHCyMYonkCXz1w", "AIzaSyA5dmZA8HwtRCI24FDlf4E0atZ5KjYxzWA", "AIzaSyBBjLqNnzhnJ5xqRGwfdCmIVG13YNNNk2w", "AIzaSyACZdXbrIijp3kLgAGNIdSCe7uxxIvo9wY", "AIzaSyBKDw28djiaVr2rFLUUHEO2gNoa4SBa5Eo" };
            }
            
            public String getKey() {
                return keys[index];
            }
            
            public void newKey() {
                index = (index + 1) % 27;
            }
        }
        
        public static String getSubCount(String id) {
            try {
                KeyProvider provider = new SubCountWidgetProvider().new KeyProvider();
                Log.w("Ohyeah", provider.getKey());
                JSONObject json = new SubCountWidgetProvider().new JSONReader().execute("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + id + "&fields=items/statistics/subscriberCount&key=" + provider.getKey()).get();
                //Log.w("Blast", String.valueOf(json.has("error")));
                return json.getJSONArray("items").getJSONObject(0).getJSONObject("statistics").getString("subscriberCount");
                //return "Success";
            } catch (Exception e) {
                return "0";
                //return e.getClass().getCanonicalName();
                //return e.getMessage();
            }
        }
}