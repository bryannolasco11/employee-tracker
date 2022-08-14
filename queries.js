const cTable = require('console.table');
const connection = require('./db/connection');
const mysql = require('mysql2');
const index = require('./index');
const inquirer = require('inquirer');

// From MYSQL2 docs: MySQL provides execute helper which will prepare and query the statement. 
const viewDept = ()=> {
    //console.log('This is viewDept');
    const sql = `SELECT * FROM department`;
    connection.query(sql, (err, results)=> {
        if (err) throw err;
            //console.log(results);
            // from console.table doc
            const table = cTable.getTable(results);
            console.log(table);
            promptUser();
        }
    );  
};



const viewRoles = () => {
    const sql = `SELECT * FROM department`;
    connection.query(sql, (err, results)=> {
        if (err) throw err;
            //console.log(results);
            // from console.table doc
            const table = cTable.getTable(results);
            console.log(table);
            promptUser();  
        }
    ); 
};
// show employee id, first name, last name, job titles, departments, salaries, and manager
// from department get department name
// from roles get job title and salary
// from employees get first name, last name, salaries
// manager?

const viewEmployees = () => {
    // const sql = `SELECT employees.id,
    //                     employees.first_name,
    //                     employees.last_name
    //                     FROM employees
    //                     LEFT JOIN roles 
    //                         ON employees.id =roles.id;
                       
    //                     `; // LEFT J
    //                     // department.dept_name,
    //                     // roles.salary,
    // connection.query(sql, (err, results)=> {
    //     if (err) throw err;
    //         //console.log(results);
    //         // from console.table doc
    //         const table = cTable.getTable(results);
    //         console.log(table);
    //         promptUser();
    //     }
    // )
};

const addDept = () => {
    inquirer.prompt([
        {
           type: 'input',
           name: 'addDept',
           message: 'What is the name of the department that you wish to add?',
           validate: inputDept => {
            if (inputDept) {
              return true;
            } else {
                console.log('Please enter a department name.');
                return false;
              }
            }
          } 
    ])
    .then(answer => {
        const sql = `INSERT INTO department(dept_name)
                    VALUES (?)`;
                    connection.query(sql, answer.addDept, (err, result) => {
                        if (err) throw err;
                        console.log(`You have added ${answer.addDept}!`);
                        viewDept();
                    })
    })
};

// When choose to add a role
// 1) prompt enter name, salary, and dept for the role
// 2) that role is added to the database
    // INSERT INTO prices (id, price) VALUES (1, 10.55);
// However the department is already there. 
//So, do we have to push the dept names into an array, 
// then filter those out to display in a list for the inquiry?

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What is the name of the role you wish to add?',
            validate: inputDept => {
                if (inputDept) {
                  return true;
                } else {
                    console.log('Please enter a department name.');
                    return false;
                  }
                } 
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for the role?',
            validate: inputSalary => {
                if(inputSalary) {
                    return true;
                } else {
                    console.log('Please enter a salary.');
                    return false;
                }
            }
        }
    ])
    . then(answer => {
        //use params to put rolename and salary in an array
        const params = [answer.role, answer.salary];
        //console.log (answer.role);
        //console.log (answer.salary);
        //console.log(params);

        // now I have to grab the department name from the table
        const deptSql = `Select department.id, department.dept_name FROM department`;
        connection.query(deptSql, (err, result) =>{
            if (err) throw err;
        // Each dept name and title as to go into the inquirer
        // array.map(function(currentValue, index, arr), thisValue) from w3 schools
        // const persons = [
        //     {firstname : "Malcom", lastname: "Reynolds"},
        //     {firstname : "Kaylee", lastname: "Frye"},
        //     {firstname : "Jayne", lastname: "Cobb"}
        //   ];
          
        //   persons.map(getFullName);
          
        //   function getFullName(item) {
        //     return [item.firstname,item.lastname].join(" ");
        //   }
        
        //console.log(result); result is in an array
        const deptNameArray = result;
        console.log(deptNameArray);
        //const array1 = [1, 4, 9, 16];

        // pass a function to map
        // const map1 = array1.map(x => x * 2);
        // console.log(map1);
        // expected output: Array [2, 8, 18, 32]
        //map((element, index) => { /* … */ })
        //const deptsForInquiry = deptNameArray.map(({dept_name}) => ({department: dept_name}));
        console.log(deptsForInquiry);

        inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'For which department does the role belong?',
                choices: deptsForInquiry
            }
        ])
        })
    })
};

function addEmployee() {
    console.log('This is addEmployee');
};

function updateRole() {
    console.log('This is updateRole');
};

module.exports = { 
    viewDept,
    viewRoles,
    addDept,
    addRole,
    viewEmployees
}