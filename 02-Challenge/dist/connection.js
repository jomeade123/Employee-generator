"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT)
});
exports.default = pool;
// queries.ts - SQL Queries for CRUD operations
exports.queries = {
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
