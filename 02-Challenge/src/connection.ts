// Export a new Pool instance from the pg package. This will be used to connect to the database.
import { Pool } from 'pg';
import dotenv from 'dotenv';

console.log('process.env.DB_USER:', process.env.DB_USER);
console.log('process.env.DB_HOST:', process.env.DB_HOST);
console.log('process.env.DB_NAME:', process.env.DB_NAME);
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
});

export default pool;

// queries.ts - SQL Queries for CRUD operations
export const queries = {
    getAllDepartments: 'SELECT * FROM department;',
    getAllRoles: `SELECT role.id, role.title, role.salary, department.name AS department 
                  FROM role JOIN department ON role.department_id = department.id;`,
    getAllEmployees: `SELECT employee.id, employee.first_name, employee.last_name, role.title, 
                      department.name AS department, role.salary, 
                      CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
                      FROM employee 
                      JOIN role ON employee.role_id = role.id 
                      JOIN department ON role.department_id = department.id 
                      LEFT JOIN employee AS manager ON employee.manager_id = manager.id;`,
    addDepartment: 'INSERT INTO department (name) VALUES ($1) RETURNING *;',
    addRole: 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *;',
    addEmployee: 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *;',
    updateEmployeeRole: 'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *;'
};


