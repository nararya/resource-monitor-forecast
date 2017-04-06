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
@Table(name = "project_skills")
public class ProjectSkills {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private long id;

	@Column(name = "project_id")
	private long projectId;

	@Column(name = "skill_id")
	private long skillId;

	@Column(name = "level")
	private long level;

	
	@Column(name = "employee_id")
	private long employeeId;

}
