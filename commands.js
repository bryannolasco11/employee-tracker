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
//I might need a constructor here.  I have to display a new table"
function viewEmployees() {
    const sql = `SELECT e`
    console.log('This is viewEmployees');
};

const addDept = () => {
    return inquirer.prompt([
        {
           type: 'input',
           name: 'addDept',
           message: 'What is the name of the department that you wish to add?',
           validate: descriptionInput => {
            if (descriptionInput) {
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

function addRole() {
    console.log('This is addRole');
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
    addDept
}