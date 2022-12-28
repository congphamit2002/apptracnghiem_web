package com.app.apptracnghiem_web.utils;

import com.app.apptracnghiem_web.constant.Constant;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class GetDataType {

    public static String getTokenFromCookie(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, Constant.TOKEN_USER);
        String value = cookie.getValue();
        System.out.println("TOKEN " + value);
        return value;
    }

    public static String getDataTypeGet(String url, HttpServletRequest request) {
        StringBuilder responeData = new StringBuilder();

        try {
            URL newUrl = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) newUrl.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Authorization", "Bearer " + getTokenFromCookie(request));

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));

            String line = "";
            while((line = bufferedReader.readLine()) != null) {
                responeData.append(line);
            }
            bufferedReader.close();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }

        return responeData.toString();
    }

    public static String getDataTypePost(String url) {
        StringBuilder responeData = new StringBuilder();

        try {
            URL newUrl = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) newUrl.openConnection();
            connection.setRequestMethod("POST");

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));

            String line = "";
            while((line = bufferedReader.readLine()) != null) {
                responeData.append(line);
            }
            bufferedReader.close();
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }

        return responeData.toString();
    }
}
