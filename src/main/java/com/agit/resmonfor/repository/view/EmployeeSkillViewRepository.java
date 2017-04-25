package com.agit.resmonfor.repository.view;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import com.agit.resmonfor.entity.view.EmployeeSkillView;


public interface EmployeeSkillViewRepository extends JpaRepository<EmployeeSkillView, Integer>{
	List<EmployeeSkillView> findBySkillId(Integer skillId);
	List<EmployeeSkillView> findByEmployeeId(Integer employeeId);
}
