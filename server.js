// 1) install everything
// 2) use inquiry for:
//         view all devicePixelRatio, view all roles, 
//         view all employees, add a department,
//         add a role, add an empolyee, and 
//         update employee role

// 3) make functions for all the functions
// dependencies
const inquirer = require('inquirer');
//const db = require('./db/connection');

// const PORT = process.env.PORT || 3001;

// db.connect(err => {
//     if (err) throw err;
//     console.log("For the thousands in attendence and the millions watching around the world...Let's get ready to track the employees!");
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//       });
//     promptUser();
//   });
  
promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'Please choose from the following options:',
            choices: ['View all departments, View all roles, View all employees, Add a department, Add a role, Add an employee, Update an employee role']
        }
    ])
    .then((answer)=>{
        console.log(answer.selection);
        switch(answers.selection) {
            case 'View all departments':
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
};

function viewDept() {
    console.log('This is viewDept');
};

function viewRoles() {
    console.log('This is viewRoles');
};

function viewEmployees() {
    console.log('This is viewEmployees');
};

function addDept() {
    console.log('This is addDept');
};

function addRole() {
    console.log('This is addRole');
};

function addEmployee() {
    console.log('This is addEmployee');
};

function updateRole() {
    console.log('This is updateRole');
};