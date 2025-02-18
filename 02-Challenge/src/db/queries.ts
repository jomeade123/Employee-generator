import pool from '../connection.js';
import {Employee} from '../types.js';

export const getDepartments = async () => {
  const result = await pool.query('SELECT * FROM department');
  return result.rows;
};

export const getRoles = async () => {
  const result = await pool.query(`
    SELECT role.id, role.title, role.salary, department.name AS department 
    FROM role 
    JOIN department ON role.department_id = department.id
  `);
  return result.rows;
};

export const getEmployees = async ():Promise<Employee[]>  => {
  const {rows} = await pool.query(`
    SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, 
           CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    JOIN role ON e.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON e.manager_id = m.id
  `);
  return rows;
};

export const addDepartment = async (name: string) => {
  await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

export const addRole = async (title: string, salary: number, department_id: number) => {
  await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
};

export const addEmployee = async (first_name: string, last_name: string, role_id: number, manager_id: number | null) => {
  await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', 
                   [first_name, last_name, role_id, manager_id]);
};

export const updateEmployeeRole = async (employee_id: number, new_role_id: number) => {
  await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [new_role_id, employee_id]);
};
