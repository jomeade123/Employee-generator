import inquirer from 'inquirer';
export const mainMenu = async () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]);
};
export const departmentPrompt = async () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:'
        }
    ]);
};
export const rolePrompt = async (departments) => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the role title:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for this role:',
            validate: (value) => !isNaN(Number(value)) || 'Please enter a valid number'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Select a department:',
            choices: departments.map(dep => ({ name: dep.name, value: dep.id }))
        }
    ]);
};
export const employeePrompt = async (roles, managers) => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name:'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select a role:',
            choices: roles.map(role => ({ name: role.title, value: role.id }))
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select a manager (if applicable):',
            choices: [...managers.map(manager => ({ name: manager.name, value: manager.id })), { name: 'None', value: null }]
        }
    ]);
};
