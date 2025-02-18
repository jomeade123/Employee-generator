import { mainMenu, departmentPrompt, rolePrompt, employeePrompt } from './prompts.js';
import { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } from './db/queries.js';
import inquirer from 'inquirer';
import {Employee, Role} from './types.js';

const startApp = async () => {
  let exit = false;

  while (!exit) {
    const { action } = await mainMenu();

    switch (action) {
      case 'View all departments':
        console.table(await getDepartments());
        break;

      case 'View all roles':
        console.table(await getRoles());
        break;

      case 'View all employees':
        console.table(await getEmployees());
        break;

      case 'Add a department':
        const { name } = await departmentPrompt();
        await addDepartment(name);
        console.log(`Department "${name}" added!`);
        break;

      case 'Add a role':
        const departments = await getDepartments();
        const roleData = await rolePrompt(departments);
        await addRole(roleData.title, parseFloat(roleData.salary), roleData.department_id);
        console.log(`Role "${roleData.title}" added!`);
        break;

      case 'Add an employee':
        const roles = await getRoles();
        const employees:Employee[] = await getEmployees();
        const managers = employees.map((emp: Employee) => ({ name: `${emp.first_name} ${emp.last_name}`, id: emp.id }));
        const employeeData = await employeePrompt(roles, managers);
        await addEmployee(employeeData.first_name, employeeData.last_name, employeeData.role_id, employeeData.manager_id);
        console.log(`Employee "${employeeData.first_name} ${employeeData.last_name}" added!`);
        break;

      case 'Update an employee role':
        const employeesList = await getEmployees();
        const employeeChoices = employeesList.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
        const rolesList = await getRoles();
        const roleChoices = rolesList.map((role: Role) => ({ name: role.title, value: role.id }));

        const { employee_id, new_role_id } = await inquirer.prompt([
          {
            type: 'list',
            name: 'employee_id',
            message: 'Select an employee to update:',
            choices: employeeChoices
          },
          {
            type: 'list',
            name: 'new_role_id',
            message: 'Select the new role:',
            choices: roleChoices
          }
        ]);

        await updateEmployeeRole(employee_id, new_role_id);
        console.log('Employee role updated!');
        break;

      case 'Exit':
        exit = true;
        console.log('Goodbye!');
        break;
    }
  }
};

startApp();
