const cTable = require('console.table');
const connection = require('./db/connection');
const mysql = require('mysql2');
const index = require('./index');
const inquirer = require('inquirer');
const Department = require('./lib/department.js');

// From MYSQL2 docs: MySQL provides execute helper which will prepare and query the statement. 
const viewDept = () => {
    //console.log('This is viewDept');
    const sql = `SELECT * FROM department`;
    connection.query(sql, (err, results) => {
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
    const sql = `SELECT roles.title,
                        roles.id,
                        department.dept_name AS department,
                        roles.salary 
                FROM roles
                        LEFT JOIN department ON roles.department_id = department.id
                `;
    connection.query(sql, (err, results) => {
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
// https://www.w3schools.com/sql/func_mysql_concat.asp
//employees.first_name, 
//employees.last_name,
const viewEmployees = () => {
    const sql = `SELECT employees.id,
                        
                       
                        CONCAT (employees.first_name, ' ', employees.last_name) AS employee,
                        roles.title,
                        department.dept_name AS department,
                        roles.salary,
                        CONCAT (manager.first_name, ' ', manager.last_name) AS manager 
                 FROM employees
                        LEFT JOIN roles ON employees.role_id = roles.id
                        LEFT JOIN department ON roles.department_id = department.id
                        LEFT JOIN employees manager ON employees.manager_id = manager.id 
                        `;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        //console.log(results);
        // from console.table doc
        const table = cTable.getTable(results);
        console.log(table);
        promptUser();
    }
    )
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
                if (inputSalary) {
                    return true;
                } else {
                    console.log('Please enter a salary.');
                    return false;
                }
            }
        }
    ])
        .then(answer => {
            //use params to put rolename and salary in an array

            //console.log (answer.role);
            //console.log (answer.salary);
            //console.log(params);

            // now I have to grab the department name from the table
            const deptSql = `Select department.id AS value, department.dept_name AS name FROM department`;
            connection.query(deptSql, (err, result) => {
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
                //[{ name: "a", value: 1 }]
                // pass a function to map
                // const map1 = array1.map(x => x * 2);
                // console.log(map1);
                // expected output: Array [2, 8, 18, 32]
                //map((element, index) => { /* … */ })



                //console.log(deptsForInquiry);

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'department',
                        message: 'For which department does the role belong?',
                        choices: deptNameArray
                    }
                ])
                    .then((answer2) => {
                        console.log(answer2);
                        const sql = `INSERT INTO roles (title, department_id, salary)
                                VALUES
                                    (?,?,?)`;
                        const params = [answer.role, answer2.department, answer.salary];
                        connection.query(sql, params, (err, results) => {
                            if (err) throw err;
                            //console.log(results);
                            // from console.table doc
                            const table = cTable.getTable(results);
                            console.log(table);
                            viewRoles();
                        }
                        )
                    })
            })
        })

};
// enter first name, last name, role, and manager 
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
            validate: inputFirstName => {
                if (inputFirstName) {
                    return true;
                } else {
                    console.log("Please enter a first name.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
            validate: inputLastName => {
                if (inputLastName) {
                    return true;
                } else {
                    console.log("Pleae enter a last name.");
                    return false;
                }
            }
        }
    ])
        // I am getting the roles for displaying 
        .then(answer => {

            const roleSql = `SELECT roles.id AS value, roles.title AS name from roles`;
            connection.query(roleSql, (err, result) => {
                if (err) throw err;
                const roleTitleArray = result;
                console.log(roleTitleArray);

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the role of the Employee?',
                        choices: roleTitleArray
                    }
                ])
                    .then((answer2) => {
                        console.log(answer2);

                        const manSql = `SELECT 
                                        employees.id as value,
                                        CONCAT (employees.first_name, ' ', employees.last_name) AS name 
                                    FROM employees 
                                    `;
                        connection.query(manSql, (err, result) => {
                            if (err) throw err;
                            const managerArray = result;
                            console.log(managerArray);

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'manager',
                                    message: `Who will be the manager of ${answer.lastName}?`,
                                    choices: managerArray
                                }
                            ])
                                .then((answer3) => {
                                    console.log(answer3);
                                    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                                            VALUES (?, ?, ?, ?)`;
                                    const params = [answer.firstName, answer.lastName, answer2.role, answer3.manager]
                                    console.log(params)
                                    connection.query(sql, params, (err, results) => {
                                        if (err) throw err;
                                        const table = cTable.getTable(results);
                                        console.log(table);
                                        viewEmployees();
                                    })
                                })
                        })
                    })
            })
        })


};

updateRole = () => {
    const empSql = `SELECT 
                            employees.id AS value,
                            CONCAT (employees.first_name, ' ', employees.last_name) AS name
                            FROM employees`;
    connection.query(empSql, (err, result) => {
        if (err) throw err;
        const employeeArray = result;
        console.log(employeeArray);
        // inquirer to ask which employee want
        // display the roles
        // update the role
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: "Which employee's role do you wish to update?",
                choices: employeeArray
            }
        ])
            // We need to insert
            .then((answer) => {
                console.log(answer);
                // https://www.w3schools.com/mysql/mysql_update.asp
                // the update MYSQL command would be UPDATE employee SET role_id WHERE id 
                // so I need employees.role_id and employees.id
                // I already have employees.id so I need employees role id
                const empRoleSql = `SELECT roles.id AS value, roles.title AS name FROM roles`;
                connection.query(empRoleSql, (err, result) => {
                    if (err) throw err;
                    const diffRoleArray = result;
                    console.log(diffRoleArray);

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'role',
                            message: 'What is the role of the Employee?',
                            choices: diffRoleArray
                        }
                    ])
                        .then((answer2) => {
                            console.log(answer2);

                            const diffRoleSql = `UPDATE employees SET role_id = ? WHERE id =?`
                            const params = [answer2.role, answer.employee]
                            console.log(params);
                            connection.query(diffRoleSql, params, (err, results) => {
                                if (err) throw err;
                                const table = cTable.getTable(results);
                                viewEmployees();
                            })
                        })
                })

            })
    }
    )
};

deleteEmployee = () => {
    console.log('This is deleteEmployee');
    const employeeSql = `SELECT employees.id as value,
                CONCAT (employees.first_name, ' ', employees.last_name) 
                AS name FROM employees`;
    connection.query(employeeSql, (err, result) => {
        if (err) throw err;
        const empName = result;
        console.log(result);

        inquirer.prompt([
            {
                type: 'list',
                name: 'delete',
                message: 'Which employee would you like to delete?',
                choices: empName
            }
        ])
           .then(answer => {
               const sql = `DELETE FROM employees WHERE id = ?`
               const params = answer.delete;
               console.log(params);
               connection.query(sql, params, (err, results) => {
                   if (err) throw err;
                   const table = cTable.getTable(result);
                   console.log(table);
                    viewEmployees();
               })
           })
    })
};

deleteDepartment = () => {
    const deptSql = `SELECT department.id as value, department.dept_name AS name FROM department`;
    connection.query(deptSql, (err, result) => {
        if (err) throw err;
        const deptName = result;
        console.log(result);

        inquirer.prompt([
            {
                type: 'list',
                name: 'delete',
                message: 'Which department would you like to delete?',
                choices: deptName
            }
        ])
           .then(answer => {
               const sql = `DELETE FROM department WHERE id = ?`
               const params = answer.delete;
               console.log(params);
               connection.query(sql, params, (err, results) => {
                   if (err) throw err;
                   const table = cTable.getTable(result);
                   console.log(table);
                    viewDept();
               })
           })
    })
};



module.exports = {
    viewDept,
    viewRoles,
    addDept,
    addRole,
    viewEmployees,
    addEmployee,
    updateRole,
    deleteEmployee,
    deleteDepartment
}