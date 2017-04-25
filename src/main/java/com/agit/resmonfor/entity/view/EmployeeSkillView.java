package com.agit.resmonfor.entity.view;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.agit.resmonfor.entity.Employee;
import com.agit.resmonfor.entity.Skill;

import lombok.Data;

@Data
@Entity
@Table(name = "employee_skills_view")
public class EmployeeSkillView {
	@Id
	@Column(name = "id")
	private Integer id;

	@Column(name = "skill_id")
	private Integer skillId;

	@Column(name = "skill_name")
	private String skillName;
	
	@Column(name = "employee_id")
	private Integer employeeId;

	@Column(name = "employee_name")
	private String employeeName;

	@Column(name = "skill_level")
	private String skillLevel;
}
