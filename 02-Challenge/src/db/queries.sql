-- View all departments
SELECT * FROM department;

-- View all roles with department names
SELECT role.id, role.title, role.salary, department.name AS department 
FROM role 
JOIN department ON role.department_id = department.id;

-- View all employees with role and manager details
SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, 
       CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
JOIN role ON e.role_id = role.id
JOIN department ON role.department_id = department.id
LEFT JOIN employee m ON e.manager_id = m.id;

-- Add a new department
INSERT INTO department (name) VALUES ('Sales');

-- Add a new role
INSERT INTO role (title, salary, department_id) VALUES ('Marketing Specialist', 60000, 4);

-- Add a new employee
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('David', 'Miller', 4, 2);

-- Update an employee's role
UPDATE employee SET role_id = 2 WHERE id = 1;

