package com.app.apptracnghiem_web.filter;

import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class LoginFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;

        String url = httpServletRequest.getRequestURL().toString();
        if(url.contains(".")) {
            chain.doFilter(request, response);
            return;
        }

        System.out.println("URL: " + url);
        Cookie[] cookies;
        if(httpServletRequest.getCookies() != null) {
            cookies = httpServletRequest.getCookies();
            System.out.println("COOKIE SIZE " + cookies.length);
            boolean isCookie = false;
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("token_user")) {
                    isCookie = true;
                    System.out.println("Cookie is true");
                    break;
                }
            }

            if(!isCookie && url.endsWith("/login")) {
                chain.doFilter(request, response);
                return;
            }

            if(isCookie && url.endsWith("/login")) {

                httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + "/admin/accountManagement");
                return;
            }

            if(!isCookie) {
                httpServletResponse.sendRedirect(httpServletRequest.getContextPath() + "/admin/login");
                return;
            } else {
                chain.doFilter(request, response);
            }
        }

//        chain.doFilter(request, response);

    }
}
