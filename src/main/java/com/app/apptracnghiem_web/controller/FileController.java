package com.app.apptracnghiem_web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/file")
public class FileController {

	@GetMapping("")
	public ModelAndView index() {
		ModelAndView andView = new ModelAndView("admin/uploadFile.html");
		return andView;
	}
	
	
	
	
}
