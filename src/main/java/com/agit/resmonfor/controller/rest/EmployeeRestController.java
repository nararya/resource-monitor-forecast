package com.agit.resmonfor.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.agit.resmonfor.entity.Employee;
import com.agit.resmonfor.repository.EmployeeRepository;

@RestController
@RequestMapping(path = "rest")
public class EmployeeRestController {
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	@RequestMapping(
		path = "employee",
		method = RequestMethod.GET
	)
	public Page<Employee> getEmployees(Pageable pageable){
		return employeeRepository.findAll(pageable);
	}
	
	@RequestMapping(
		path = "employee/save",
		method = RequestMethod.POST
	)
	public Employee submitEmployee(@RequestBody Employee employee){
		employeeRepository.save(employee);
		return employee;
	}
	
}
