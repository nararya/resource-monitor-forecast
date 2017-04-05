package com.agit.resmonfor.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

	@RequestMapping(value = "/")
    public String getExam(@PathVariable("code") String code, Model model) {
		return "home";
	}
}
