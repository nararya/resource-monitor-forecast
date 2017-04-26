CREATE OR REPLACE VIEW public.employee_skills_view AS 
 SELECT employee_skills.id,
    employee_skills.skill_level,
    employee_skills.employee_id,
    employee_skills.skill_id,
    employee_skills.employeeid,
    employee_skills.skillid,
    employees.name AS employee_name,
    skills.id AS skill_name
   FROM employee_skills
     JOIN employees ON employee_skills.employee_id = employees.id
     JOIN skills ON employee_skills.skill_id = skills.id;