package com.agit.resmonfor.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.agit.resmonfor.entity.Employee;
import com.agit.resmonfor.entity.Skill;
import com.agit.resmonfor.entity.view.EmployeeSkillView;
import com.agit.resmonfor.repository.EmployeeRepository;
import com.agit.resmonfor.repository.SkillRepository;
import com.agit.resmonfor.service.EmployeeSkillService;

@RestController
@RequestMapping(path = "rest/employee")
public class EmployeeRestController {
	
	@Autowired
	EmployeeRepository employeeRepository;

	@Autowired
	EmployeeSkillService employeeSkillService;

	
	@RequestMapping(
		path = "/get",
		method = RequestMethod.GET
	)
	public Page<Employee> getEmployees(Pageable pageable){
		Page<Employee> employeePage = employeeRepository.findAll(pageable);
		List<Employee> employees = employeePage.getContent();

		for(Employee employee : employees){
			Integer employeeId = employee.getId();
			List<EmployeeSkillView> employeeSkills = employeeSkillService.getByEmployeeId(employeeId);
			employee.setSkills(employeeSkills);
		}
		
		return employeePage;
	}
	
	@RequestMapping(
		path = "/save",
		method = RequestMethod.POST
	)
	public Employee submitEmployee(@RequestBody Employee employee){
		employeeRepository.save(employee);
		return employee;
	}
	
}
