import inquirer from 'inquirer';
import pool from './connection';
import { queries } from './queries';

async function mainMenu() {
    const { action } = await inquirer.prompt([
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
            const departments = await pool.query(queries.getAllDepartments);
            console.table(departments.rows);
            break;
        case 'View All Roles':
            const roles = await pool.query(queries.getAllRoles);
            console.table(roles.rows);
            break;
        case 'View All Employees':
            const employees = await pool.query(queries.getAllEmployees);
            console.table(employees.rows);
            break;
        case 'Add Department':
            const { departmentName } = await inquirer.prompt([
                { type: 'input', name: 'departmentName', message: 'Enter department name:' }
            ]);
            await pool.query(queries.addDepartment, [departmentName]);
            console.log('Department added successfully!');
            break;
        case 'Add Role':
            const { title, salary, departmentId } = await inquirer.prompt([
                { type: 'input', name: 'title', message: 'Enter role title:' },
                { type: 'input', name: 'salary', message: 'Enter salary:' },
                { type: 'input', name: 'departmentId', message: 'Enter department ID:' }
            ]);
            await pool.query(queries.addRole, [title, salary, departmentId]);
            console.log('Role added successfully!');
            break;
        case 'Add Employee':
            const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                { type: 'input', name: 'firstName', message: 'Enter first name:' },
                { type: 'input', name: 'lastName', message: 'Enter last name:' },
                { type: 'input', name: 'roleId', message: 'Enter role ID:' },
                { type: 'input', name: 'managerId', message: 'Enter manager ID (null for none):' }
            ]);
            await pool.query(queries.addEmployee, [firstName, lastName, roleId, managerId || null]);
            console.log('Employee added successfully!');
            break;
        case 'Update Employee Role':
            const { employeeId, newRoleId } = await inquirer.prompt([
                { type: 'input', name: 'employeeId', message: 'Enter employee ID:' },
                { type: 'input', name: 'newRoleId', message: 'Enter new role ID:' }
            ]);
            await pool.query(queries.updateEmployeeRole, [newRoleId, employeeId]);
            console.log('Employee role updated successfully!');
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }
    mainMenu();
}

mainMenu();
