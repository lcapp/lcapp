package net.livecounts;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.Context;
import android.appwidget.AppWidgetManager;
import android.util.Log;

public class Util {
 
    public static void scheduleUpdate(Context context) {
        Log.w("Heyhey", "Scheduling update");
        /*SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(context);
        String interval = prefs.getString(SettingsActivity.INTERVAL_PREF, null);*/
         
        AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        //long intervalMillis = Integer.parseInt(interval)*60*1000;
        long intervalMillis = 5000;
 
        PendingIntent pi = getAlarmIntent(context);
        am.cancel(pi);
        am.setInexactRepeating(AlarmManager.RTC, System.currentTimeMillis(), intervalMillis, pi);
    }
     
    private static PendingIntent getAlarmIntent(Context context) {
        //Log.w("Heyhey", "Scheduling update for real");
        Intent intent = new Intent(context, SubCountWidgetProvider.class);
        intent.setAction(SubCountWidgetProvider.ACTION_UPDATE);
        PendingIntent pi = PendingIntent.getBroadcast(context, 0, intent, 0);
        return pi;
    }
 
    public static void clearUpdate(Context context) {
        AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        am.cancel(getAlarmIntent(context));
    }   
     
}