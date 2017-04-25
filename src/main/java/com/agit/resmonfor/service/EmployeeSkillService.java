package com.agit.resmonfor.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agit.resmonfor.entity.EmployeeSkill;
import com.agit.resmonfor.entity.view.EmployeeSkillView;
import com.agit.resmonfor.repository.EmployeeSkillRepository;
import com.agit.resmonfor.repository.view.EmployeeSkillViewRepository;

@Service
public class EmployeeSkillService {
	
	@Autowired
	EmployeeSkillViewRepository viewRepository;
	
	@Autowired
	EmployeeSkillRepository mainRepository;

	public List<EmployeeSkillView> getByEmployeeId(Integer employeeId) {
		return viewRepository.findByEmployeeId(employeeId);
	}

	public void save(EmployeeSkill employeeSkill) {
		mainRepository.save(employeeSkill);
	}
	
}
