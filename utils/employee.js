//dependecies
const inquirer = require('inquirer');
const {createRoleArr, createManagerArr, createEmployeeArr, createDepartmentArr} = require('./general');

function viewEmployees (db) {
    const sql = `SELECT * FROM employee`

    // this query uses the above variable to query the database 
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }

        // after the information is displayed the user is returned to the mwin menu
         console.table(rows);
        mainMenu();
    });
}

function viewEmployeeDepartment (db) {
    const sql = `SELECT department.*, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS role, role.salary AS salary, employee.manager_id AS manager_id
                FROM department
                JOIN employee ON department.id = employee.department_id
                JOIN role ON role.id = employee.role_id 
                ORDER BY department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }

        // after the information is displayed the user is returned to the mwin menu
         console.table(rows);
        mainMenu();
    });
};
    
//view all employees by manager
function viewEmployeeManager (db) {
    const sql = `SELECT employee.*, role.title AS role, role.salary AS salary
                FROM employee
                JOIN role ON employee.role_id = role.id
                ORDER BY manager_id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }

        console.table(rows);
        mainMenu();
    });
};

//view all employees by role
function viewEmployeeRole (db) {
    const sql =  `SELECT role.*, employee.first_name AS first_name, employee.last_name AS last_name
                FROM role
                JOIN employee ON role.id = employee.role_id`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }
            
        // after the information is displayed the user is returned to the mwin menu
        console.table(rows);
        mainMenu();
    });
};


//add employee
// this function handles the dding of employees to the employee table
function addEmployee(db) {
    const sql = `SELECT role.title
                    FROM role`;

    // this query returns the titles of the roles in the role table
    db.query(sql, (err, result) => {
        // creates an array based on the results that were returned
        const roleArr = createRoleArr(result);

        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the employees first name?',
                validate: (first_name) => {
                    if (first_name) {
                        return true;
                    }
                    
                    console.log('You must enter a valid first name!');
                    return false;
                }
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the employees last name?',
                validate: (last_name) => {
                    if (last_name) {
                        return true;
                    }

                    console.log('You must enter a valide last name!');
                    return false;
                }
            },
            {
                type: 'number',
                name: 'employeeId',
                message: "What is the employee's id:",
                validate: (employeeId) => {
                    // ensures a number is input in the id field
                    const isValid = Number.isInteger(employeeId);

                    return isValid || 'Please enter a id number!';
                },
                // if a number is not used this clears the NaN prompt
                filter: (employeeId) => {
                    // clear the invalid input
                    return Number.isNaN(employeeId) || Number(employeeId) <= 0 ? '' : Number(employeeId);
                }
            },
            {
                type: 'list',
                name: 'role',
                message: 'What role does this employee have?',
                choices: roleArr
            },
            {
                type: 'confirm',
                name: 'manager',
                message: 'Does this employee have a manager?',
                default: true
            },
            {
                type: 'number',
                name: 'managerId',
                message: "What is the manager's id:",
                validate: (managerId) => {
                    // ensures a number is input in the manager id field
                    const isValid = Number.isInteger(managerId);

                    return isValid || 'Please enter a id number!';
                },
                // if there is an invalid input this clears the NaN prompt
                filter: (managerId) => {
                    // clear the invalid input
                    return Number.isNaN(managerId) || Number(managerId) <= 0 ? '' : Number(managerId);
                },
                when: ({ manager }) => {
                    if (manager) {
                        return true;
                    }

                    return false;
                }
            }
        ]).then(response => {
            const sql = `SELECT role.id
                            FROM role
                            WHERE role.title = ?`;

  
            let params = response.role;

            // this grabs the role id based on the role that was chosen above
            db.query(sql, params, (err, result) => {
                roleId = (result[0].id);

                // if the employee does not have a manager the field will be null otherwise it will contain the id number that was input
                if (response.manager === false) {
                    managerId = null;
                } else {
                    managerId = response.managerId;
                }
    
                const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
                                VALUES (?, ?, ?, ?, ?)`;
    
                let params = [response.employeeId, response.first_name, response.last_name, roleId, managerId];
    
                // this query creates a new employee based on the above two paramaters
                db.query(sql, params, (err, result) => {
                    if (err) {
                        console.log(err);
                    }
    
                    console.log('Employee added successfully!');
                    mainMenu(db)
                    return;
                });
            });
        });       
    });
};


//update employee
function updateEmployee(db) {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name
                    FROM employee
                    ORDER BY employee.first_name ASC`;

    // this query returns the names of the employees in order of the first name
    db.query(sql, (err, result) => {
        // creates an array based on the results return above and add an exit option
        const employeeArr = createEmployeeArr(result);

        employeeArr.push('Exit');

        const sql = `SELECT role.title
                        FROM role`;

        // this query returns the titles from the roles above
        db.query(sql, (err, result) => {
            // this creates an array of roles to be used below 
            const roleArr = createRoleArr(result);

            const sql = `SELECT employee.first_name, employee.last_name
                            FROM employee
                            WHERE employee.manager_id IS NULL`;

            // this returns the names of the managers
            db.query(sql, (err, result) => {
                // this creates an array of manager objects to be used below and adds a none option
                const managerArr = createManagerArr(result);

                managerArr.push('None');

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: "Which employee's record would you like to update?",
                        choices: employeeArr
                    },
                    {
                        type: 'list',
                        name: 'update',
                        message: 'What would you like to update?',
                        choices: ['Id', 'First Name', 'Last Name', 'Role', 'Manager'],
                        when: ({ employee }) => {
                            if (employee !== 'Exit') {
                                return true;
                            }

                            return false;
                        }
                    },
                    {
                        type: 'number',
                        name: 'id',
                        message: 'What is the new id?',
                        // ensures the new id is a number
                        validate: (id) => {
                            const isValid = Number.isInteger(id);
        
                            return isValid || 'Please enter a id number!';
                        },
                        // if an invalid response is entered this clears the NaN prompt
                        filter: (id) => {
                            // clear the invalid input
                            return Number.isNaN(id) || Number(id) <= 0 ? '' : Number(id);
                        },
                        when: ({ update }) => {
                            if (update === 'Id') {
                                return true;
                            }
        
                            return false;
                        }
                    },
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the new first name?',
                        when: ({ update }) => {
                            if(update === 'First Name') {
                                return true;
                            }
    
                            return false;
                        }
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the new last name?',
                        when: ({ update }) => {
                            if(update === 'Last Name') {
                                return true;
                            }
    
                            return false;
                        }
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the new role?',
                        choices: roleArr,
                        when: ({ update }) => {
                            if (update === 'Role') {
                                return true;
                            }

                            return false;
                        }
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Who is the new manager?',
                        choices: managerArr,
                        when: ({ update }) => {
                            if (update === 'Manager') {
                                return true
                            }

                            return false;
                        }
                    }
                ]).then(response => {
                    // if the user decides to exit they will be returned to the main menu
                    if (response.employee === 'Exit') {
                        mainMenu(db);
                        return;
                    }

                    // creates the variable that will be used to search for the employee to update. Currently uses the last name
                    let employeeSearch;

                    for (let i = 0; i < employeeArr.length; i++) {
                        if (response.employee === employeeArr[i].name) {
                            employeeSearch = employeeArr[i].id;
                        }
                    }

                    // if the user decides to update the id of an employee this contains the logic to do that
                    if (response.update === 'Id') {
                        const sql = `UPDATE employee
                                        SET employee.id = ?
                                        WHERE employee.id = ?`;

                        let params = [response.id, employeeSearch];

                        // this updates the id of an employee
                        db.query(sql, params, (err, result) => {
                            if (err) {
                                console.log(err);
                            }

                            console.log('Successfully update id!');
                            mainMenu(db);
                            return;
                        });
                    } else if (response.update === 'First Name') {
                        // if the user decides to update the first name this is the logic for that

                        const sql = `UPDATE employee
                                        SET employee.first_name = ?
                                        WHERE employee.id = ?`;

                        let params = [response.firstName, employeeSearch];

                        // this query uses the above two variables to update the first name of an employee
                        db.query(sql, params, (err, result) => {
                            if (err) {
                                console.log(err);
                            }

                            console.log('Successfully updated the first name!');
                            mainMenu(db);
                            return;
                        });
                    } else if (response.update === 'Last Name') {
                        // if a user decides to upate the last name this is the logic for that

                        const sql = `UPDATE employee
                                        SET employee.last_name = ?
                                        WHERE employee.id = ?`;

                        let params = [response.lastName, employeeSearch];

                        // this uses the abovet two variables to update the last name of an employee
                        db.query(sql, params, (err, result) => {
                            if (err) {
                                console.log(err);
                            }

                            console.log('Successfully updated the last name!');
                            mainMenu(db);
                            return;
                        });
                    } else if (response.update === 'Role') {
                        // if the user decides to update the role this contains the logic for that

                        const sql = `SELECT role.id
                                        FROM role
                                        WHERE role.title = ?`

                        // this query retrieves the id of the role that was picked from the role array above
                        db.query(sql, response.role, (err, result) => {
                            if (err) {
                                console.log(err);
                            }

                            const sql = `UPDATE employee
                                            SET employee.role_id = ?
                                            WHERE employee.id = ?`
                            
                            let params = [result[0].id, employeeSearch];

                            // this query updates the role id for the chosen employee using the id that was returned above
                            db.query(sql, params, (err, result) => {
                                if (err) {
                                    console.log(err);
                                }

                                console.log('Successfully updated the role');
                                mainMenu(db);
                                return;
                            });
                        });
                    } else if (response.update === 'Manager') {
                        // if the user decides to update the manager this contains the logic for that

                        // variable that holds the first name for the manager that was chosen
                        let managerSearch = response.manager.split(' ')[1];

                        const sql = `SELECT employee.id
                                        FROM employee
                                        WHERE employee.id = ?`;

                        let params = managerSearch;

                        // this uses the above two variables to retrieve the manager's id from the employee table
                        db.query(sql, params, (err, result) => {
                            if (err) {
                                console.log(err);
                            }

                            const sql = `UPDATE employee
                                            SET employee.manager_id = ?
                                            WHERE employee.id = ?`
                                            
                            let params = [result[0].id, employeeSearch];

                            // this query updates the manager id for an employee based on the id returned above
                            db.query(sql, params, (err, result) => {
                                if (err) {
                                    console.log(err);
                                }

                                console.log('Successfully updated managers');
                                mainMenu(db);
                                return;
                            });
                        });
                    }
                });
            });
        });
    });
};

//delete employee
// this function holds the logic for deleting an employee from the employee table
function deleteEmployee(db) {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name
                    FROM employee`;

    // this query returns the first and last name of every employee
    db.query(sql, (err, result) => {
        // an array is created to hold the employee's names to be used below and an exit option is added
        const employeeArr = createEmployeeArr(result);

        employeeArr.push('Exit');

        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to delete?',
                choices: employeeArr
            },
            {
                type: 'confirm',
                name: 'delete',
                message: 'Are you sure?',
                default: false,
                when: ({ employee }) => {
                    if (employee !== 'Exit') {
                        return true;
                    }

                    return false;
                }
            }
        ]).then(response => {
            // if the user chooses to exit they are returned to the main meny
            if (response.employee === 'Exit') {
                mainMenu(db);
                return;
            } else {
                let employeeSearch;

                for (let i = 0; i < employeeArr.length; i++) {
                    if (response.employee === employeeArr[i].name) {
                        employeeSearch = employeeArr[i].id;
                    }
                }

                // if the user decides to delete the employee this holds the logic for that
                if (response.delete) {
                    const sql = `DELETE FROM employee 
                                    WHERE employee.id = ?`;

                    // this query will delete the chosen employee from the table based on the last name
                    db.query(sql, employeeSearch, (err, response) => {
                        if (err) {
                            console.log(err);
                        }

                        console.log('Successfully deleted employee!');
                        mainMenu(db);
                        return;
                    })
                } else {
                    // if the user decides not to delete the chosen employee they will be returned to the main menu
                    mainMenu(db);
                    return;
                }
            }
        });
    });
};

module.exports = {
    viewEmployees,
    viewEmployeeDepartment,
    viewEmployeeManager,
    viewEmployeeRole,
    updateEmployee,
    addEmployee,
    deleteEmployee
}
