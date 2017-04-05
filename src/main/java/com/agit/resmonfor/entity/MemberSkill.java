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
@Table(name = "member_skills")
public class MemberSkill {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private long id;

	@Column(name = "member_id")
	private long memberId;

	@Column(name = "skill_id")
	private long skillId;
	
	@Column(name = "skill_level")
	private String level;
}
