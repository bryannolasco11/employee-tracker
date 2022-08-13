const cTable = require('console.table');
const connection = require('./db/connection');
const mysql = require('mysql2');

// From MYSQL2 docs: MySQL provides execute helper which will prepare and query the statement. 
const viewDept = ()=> {
    //console.log('This is viewDept');
    connection.execute(
        `SELECT * FROM department`,
        function(err,results) {
            console.log(results);
            // from console.table doc
            const table = cTable.getTable(results);
            console.log(table);
        }
    );
};

function viewRoles() {
    console.log('This is viewRoles');
    connection.execute(
        `SELECT * FROM roles`,
        function(err,results) {
            console.log(results);
            const table = cTable.getTable(results);
            console.log(table);
        }
    );
};
//I might need a constructor here.  I have to display a new table"
function viewEmployees() {
    const sql = `SELECT e`
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

module.exports = { 
    viewDept,
    viewRoles,
}