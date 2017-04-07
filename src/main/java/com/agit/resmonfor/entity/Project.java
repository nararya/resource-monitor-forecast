package com.agit.resmonfor.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "projects")
public class Project {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Integer id;
	
    @Column(name = "client_id")
    private Integer clientId;
    
    @Column(name = "project_name")
    private String projectName;
    
    @Column(name = "start_date")
    private Date startDate;
    
    @Column(name = "end_date")
    private Date endDate;
    
    @Column(name = "value")
    private Long value;
        
    @Column(name = "priority")
    private Integer priority;

    @Column(name = "status")
    private String status;
}
