package com.agit.resmonfor.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.agit.resmonfor.entity.Employee;


public interface EmployeeRepository extends JpaRepository<Employee, Integer>{
	Page<Employee> findAll(Pageable pageable);
}
