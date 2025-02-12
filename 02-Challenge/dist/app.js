"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const connection_1 = __importDefault(require("./connection"));
const queries_1 = require("./queries");
async function mainMenu() {
    const { action } = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Exit'
            ]
        }
    ]);
    switch (action) {
        case 'View All Departments':
            const departments = await connection_1.default.query(queries_1.queries.getAllDepartments);
            console.table(departments.rows);
            break;
        case 'View All Roles':
            const roles = await connection_1.default.query(queries_1.queries.getAllRoles);
            console.table(roles.rows);
            break;
        case 'View All Employees':
            const employees = await connection_1.default.query(queries_1.queries.getAllEmployees);
            console.table(employees.rows);
            break;
        case 'Add Department':
            const { departmentName } = await inquirer_1.default.prompt([
                { type: 'input', name: 'departmentName', message: 'Enter department name:' }
            ]);
            await connection_1.default.query(queries_1.queries.addDepartment, [departmentName]);
            console.log('Department added successfully!');
            break;
        case 'Add Role':
            const { title, salary, departmentId } = await inquirer_1.default.prompt([
                { type: 'input', name: 'title', message: 'Enter role title:' },
                { type: 'input', name: 'salary', message: 'Enter salary:' },
                { type: 'input', name: 'departmentId', message: 'Enter department ID:' }
            ]);
            await connection_1.default.query(queries_1.queries.addRole, [title, salary, departmentId]);
            console.log('Role added successfully!');
            break;
        case 'Add Employee':
            const { firstName, lastName, roleId, managerId } = await inquirer_1.default.prompt([
                { type: 'input', name: 'firstName', message: 'Enter first name:' },
                { type: 'input', name: 'lastName', message: 'Enter last name:' },
                { type: 'input', name: 'roleId', message: 'Enter role ID:' },
                { type: 'input', name: 'managerId', message: 'Enter manager ID (null for none):' }
            ]);
            await connection_1.default.query(queries_1.queries.addEmployee, [firstName, lastName, roleId, managerId || null]);
            console.log('Employee added successfully!');
            break;
        case 'Update Employee Role':
            const { employeeId, newRoleId } = await inquirer_1.default.prompt([
                { type: 'input', name: 'employeeId', message: 'Enter employee ID:' },
                { type: 'input', name: 'newRoleId', message: 'Enter new role ID:' }
            ]);
            await connection_1.default.query(queries_1.queries.updateEmployeeRole, [newRoleId, employeeId]);
            console.log('Employee role updated successfully!');
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }
    mainMenu();
}
mainMenu();
