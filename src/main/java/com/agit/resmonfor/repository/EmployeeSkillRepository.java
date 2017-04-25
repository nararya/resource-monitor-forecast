package com.agit.resmonfor.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.agit.resmonfor.entity.EmployeeSkill;


public interface EmployeeSkillRepository extends JpaRepository<EmployeeSkill, Integer>{
	Page<EmployeeSkill> findBySkillId(Pageable pageable);
	Page<EmployeeSkill> findByEmployeeId(Pageable pageable);
}
