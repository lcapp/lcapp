package net.livecounts;

import android.content.Intent;
import android.content.Context;
import android.content.ComponentName;
import android.content.BroadcastReceiver;
import android.appwidget.AppWidgetManager;

public class BootReceiver extends BroadcastReceiver {
 
    @Override
    public void onReceive(Context context, Intent intent) {
        AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
        int[] ids = appWidgetManager.getAppWidgetIds(new ComponentName(context, SubCountWidgetProvider.class));
        if (ids.length > 0) {
            Util.scheduleUpdate(context);           
        }
    }
 
}