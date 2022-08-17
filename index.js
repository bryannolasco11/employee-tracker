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
const { viewDept, viewRoles, addDept, addRole, viewEmployees, addEmployee, updateRole, deleteEmployee, deleteDepartment, deleteRole, updateManager, viewBudget } = require('./queries');


    console.log('**************************************************************************************');
    console.log('**************************************************************************************');
    console.log('***                                                                                ***');
    console.log('***                                                                                ***');
    console.log('***   FOR THE THOUSANDS IN ATTENDANCE AND THE MILLIONS WATCHING AROUND THE WORLD   ***');
    console.log('***                                                                                ***');
    console.log('***                                                                                ***');
    console.log('***                                                                                ***');
    console.log('***                                                                                ***');
    console.log('***                                                                                ***');
    console.log('***                                                                                ***');
    console.log("***           LET'S GET READY TO RUMBLE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!            ***");
    console.log('***                                                                                ***');
    console.log('***                                                                                ***');
    console.log('***                                                                                ***');
    console.log('***                                                                                ***');
    console.log('***                                                                                ***');
    console.log('***                                                                                ***');
    console.log('***                        Welcome to  the Employee Tracker!                       ***');
    console.log('***                                                                                ***');
    console.log('***                                                                                ***');
    console.log('**************************************************************************************');
    console.log('**************************************************************************************');

promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'Please choose from the following options:',
            choices: ['View all departments',  'View department budget',  'Add a department', 'Delete a department', 'View all employees', 'Add an employee', 'Update an employee manager',  'Delete an employee', 'View all roles', 'Add a role', 'Update an employee role',  'Delete a role', 'None']
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
            case 'Delete an employee':
                deleteEmployee();
                break;
            case 'Delete a department':
                deleteDepartment();
                break;
            case 'Delete a role':
                deleteRole();
                break;
            case 'Update an employee manager':
                updateManager();
                break;
            case 'View department budget':
                viewBudget();
                break
            case 'None':
                console.log('Have a nice day!')
                process.exit();
        }
    })
    
};

promptUser()

module.exports.promptUser = promptUser;