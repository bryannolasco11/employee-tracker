// 1) install everything
// 2) use inquiry for:
//         view all devicePixelRatio, view all roles, 
//         view all employees, add a department,
//         add a role, add an empolyee, and 
//         update employee role

// 3) make functions for all the functions
// dependencies
const inquirer = require('inquirer');
const db = require('./db/connection');
const { viewDept, viewRoles, addDept, addRole, viewEmployees } = require('./queries');

promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'Please choose from the following options:',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
        }
    ])
    .then((answer)=>{
        console.log(answer.selection);
        switch(answer.selection) {
            case 'View all departments':
            //console.log('View All Departments');    
            viewDept();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDept();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateRole();
                break;  
        }
    })
    //.then(promptUser);
};

promptUser()

module.exports.promptUser = promptUser;