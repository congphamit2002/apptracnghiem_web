package com.app.apptracnghiem_web.controller;

import com.app.apptracnghiem_web.constant.Constant;
import com.app.apptracnghiem_web.pojo.*;
import com.app.apptracnghiem_web.utils.GetDataType;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/admin")
public class AdminController {

	@GetMapping("/login")
	public ModelAndView login(HttpServletRequest request) {
		ModelAndView andView = new ModelAndView("./admin/login.html");
		return andView;
	}

	@GetMapping("/logout")
	public String  logout(HttpServletRequest request, HttpServletResponse response) {
		Cookie[] cookies = request.getCookies();
		for(Cookie cookie : cookies) {
			System.out.println("Cookie name " + cookie.getName());
			if(cookie.getName().equals(Constant.TOKEN_USER)) {
				System.out.println("True cookie");
				Cookie cookieLogout = new Cookie(Constant.TOKEN_USER, "");
				cookieLogout.setMaxAge(0);
				cookieLogout.setPath("/");
				cookieLogout.setDomain("localhost");
				response.addCookie(cookieLogout);
			}
		}
		return "redirect:login";
	}
	
	@GetMapping("/accountManagement")
	public ModelAndView readManagement(HttpServletRequest request) {
		System.out.println("\t\tdata " + request.getHeader("Authorization"));
		ModelAndView andView = new ModelAndView("./admin/accountManagement.html");
		andView.addObject("subjectManagement", Constant.URL_SUBJECT);
		andView.addObject("accountManagement", Constant.URL_ACCOUNT);
		String responeDataAccount = GetDataType.getDataTypeGet("http://localhost:8080/api/account/getAllAccount", request);
		String responeDataProvince = GetDataType.getDataTypeGet("http://localhost:8080/api/province/getAllProvince", request);
		System.out.println(responeDataAccount);
		ObjectMapper mapper = new ObjectMapper();

		try {
			AccountPojo[] listAccounts = mapper.readValue(responeDataAccount, AccountPojo[].class);
			ProvincesPojo[] listProvinces = mapper.readValue(responeDataProvince, ProvincesPojo[].class);
 			System.out.println("NAME " + listAccounts[0].getFullname());
			andView.addObject("listAccounts", listAccounts);
			andView.addObject("listProvinces", listProvinces);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return andView;
	}

	//success
	@GetMapping("/questionGrManagement/{id}")
	public ModelAndView fulltestManagement(@PathVariable("id") int subjectId, HttpServletRequest request) {
		ModelAndView andView = new ModelAndView("./admin/question_group_management.html");

		String responeDataQG = GetDataType.getDataTypeGet("http://localhost:8080/api/questionGroups/getAllQGBySubjectId/" + subjectId, request);
		System.out.println(responeDataQG);
		ObjectMapper mapper = new ObjectMapper();
		andView.addObject("subjectId", subjectId);
		andView.addObject("subjectManagement", Constant.URL_SUBJECT);
		andView.addObject("accountManagement", Constant.URL_ACCOUNT);

		try {
			QuestionGrPojo[] questionGrs = mapper.readValue(responeDataQG, QuestionGrPojo[].class);
			System.out.println("NAME " + questionGrs[0].getNameGroup());
			andView.addObject("listQGrs", questionGrs);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}


		return andView;
	}

	//success
	@GetMapping("/questionmanagement/{id}")
	public ModelAndView listenManagement(@PathVariable("id") int questionGrId,HttpServletRequest request) {
		ModelAndView andView = new ModelAndView("./admin/questionmanagement.html");
		String responeDataQG = GetDataType.getDataTypeGet("http://localhost:8080/api/questions/getQGrDetailByQGrId/" + questionGrId, request);
		System.out.println(responeDataQG);
		ObjectMapper mapper = new ObjectMapper();
		andView.addObject("subjectManagement", Constant.URL_SUBJECT);
		andView.addObject("accountManagement", Constant.URL_ACCOUNT);

		andView.addObject("questionGrID", questionGrId);

		try {
			QuestionGrDetailPojo[] questionGrDetails = mapper.readValue(responeDataQG, QuestionGrDetailPojo[].class);
			System.out.println("NAME " + questionGrDetails[0].getName_gr_detail());
			andView.addObject("listQGrDetails", questionGrDetails);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return andView;
	}

	//success
	@GetMapping("/subjectmanagement")
	public ModelAndView grammarManagement(HttpServletRequest request) {
		ModelAndView andView = new ModelAndView("./admin/subjectmanagement.html");
		andView.addObject("subjectManagement", Constant.URL_SUBJECT);
		andView.addObject("accountManagement", Constant.URL_ACCOUNT);

		String responeDataSubject = GetDataType.getDataTypeGet("http://localhost:8080/api/subject/getAllSubject", request);
		System.out.println(responeDataSubject);
		ObjectMapper mapper = new ObjectMapper();

		try {
			SubjectPojo[] subjects = mapper.readValue(responeDataSubject, SubjectPojo[].class);
			System.out.println("NAME " + subjects[0].getSubjectName());
			andView.addObject("listSubjects", subjects);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}


		return andView;
	}

}
