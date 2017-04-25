package com.agit.resmonfor.controller.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.agit.resmonfor.entity.Skill;
import com.agit.resmonfor.repository.SkillRepository;

@RestController
@RequestMapping(path = "rest")
public class SkillRestController {
	
	@Autowired
	SkillRepository skillRepository;
	
	@RequestMapping(
		path = "skill",
		method = RequestMethod.GET
	)
	public Page<Skill> getSkills(Pageable pageable){
		return skillRepository.findAll(pageable);
	}

	@RequestMapping(
		path = "skill/all",
		method = RequestMethod.GET
	)
	public List<Skill> getAllSkills(){
		return skillRepository.findAll();
	}

	
	@RequestMapping(
		path = "skill/save",
		method = RequestMethod.POST
	)
	public Skill submitSkill(@RequestBody Skill skill){
		skillRepository.save(skill);
		return skill;
	}
	
}
