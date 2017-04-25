package com.agit.resmonfor.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.agit.resmonfor.entity.EmployeeSkill;
import com.agit.resmonfor.service.EmployeeSkillService;

@RestController
@RequestMapping(path = "rest/employeeSkill")
public class EmployeeSkillRest {
	@Autowired
	EmployeeSkillService employeeSkillService;
	
	@RequestMapping(
		path = "/save",
		method = RequestMethod.POST
	)
	public EmployeeSkill submitEmployeeSkill(@RequestBody EmployeeSkill employeeSkill){
		employeeSkillService.save(employeeSkill);
		return employeeSkill;
	}

}
