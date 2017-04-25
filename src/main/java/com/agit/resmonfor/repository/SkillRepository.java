package com.agit.resmonfor.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.agit.resmonfor.entity.Skill;


public interface SkillRepository extends JpaRepository<Skill, Integer>{
	Page<Skill> findAll(Pageable pageable);
}
