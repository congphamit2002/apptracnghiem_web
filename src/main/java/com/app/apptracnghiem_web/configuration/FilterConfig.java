package com.app.apptracnghiem_web.configuration;

import com.app.apptracnghiem_web.filter.LoginFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
    @Autowired
    private LoginFilter loginFilter;

    @Bean
    public FilterRegistrationBean<LoginFilter> loginFilterFilterRegistrationBean() {
        FilterRegistrationBean<LoginFilter> bean = new FilterRegistrationBean<>();
        bean.setFilter(loginFilter);
        bean.addUrlPatterns("/admin/*");
        bean.setOrder(1);
        return bean;
    }
}
