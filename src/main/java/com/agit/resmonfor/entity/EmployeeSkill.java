package com.agit.resmonfor.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "employee_skills")
public class EmployeeSkill {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Integer id;

	@Column(name = "employee_id")
	private Integer employeeId;

	@Column(name = "skill_id")
	private Integer skillId;
	
	@Column(name = "skill_level")
	private String skillLevel;
}
