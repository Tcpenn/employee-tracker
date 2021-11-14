//node module dependencies
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
require('dotenv').config();

//function dependencies
const {viewDepartments, addDepartment, updateDepartment, deleteDepartment} = require('./department');
const {viewEmployees, viewEmployeeDepartment, viewEmployeeManager, viewEmployeeRole, addEmployee, deleteEmployee, updateEmployee} = require('./employee');
const {viewRoles, addRole, updateRole, deleteRole} = require('./role');

function topMenuHandler (response) {
    
    //connection to database
    const db = mysql.createConnection(
        { 
            host: 'localhost',
            //mysql username
            user: process.env.db_user,
            //mysql password
            password: process.env.db_pass,
            //database
            database: 'employee_tracker'
        },
        console.log('Connected to employee database')
    );
    dataHandler(response, db);
}

mainMenu = async () => {
    const response = await inquirer.prompt([
        {
            type: 'list',
            name: 'topMenu',
            message: 'What would you like to do?',
            choices: [
                'View All Employees', 
                'View All Employees By Department',
                'View All Employees By Manager',
                'View All Employees By Role',
                'Add Employee',
                'Update Employee',
                'Delete Employee',
                'View All Roles',
                'Add Role',
                'Update Role',
                'Delete Role',
                'View All Departments',
                'Add Department',
                'Update Department',
                'Delete Department',
                'Exit'
            ]
        }
    ])
    topMenuHandler(response);
}


function dataHandler (response, db) {
    //employee functions
    if (response.topMenu === 'View All Employees') {
        viewEmployees(db);
    } else if (response.topMenu === 'View All Employees By Department') {
        viewEmployeeDepartment(db)
    } else if (response.topMenu === 'View All Employees By Manager') {
        viewEmployeeManager(db)
    } else if (response.topMenu === 'View All Employees By Role') {
        viewEmployeeRole(db)
    } else if (response.topMenu === 'Add Employee') {
         addEmployee(db)
    } else if (response.topMenu === 'Update Employee') {
        updateEmployee(db)
    } else if (response.topMenu === 'Delete Employee') {
        deleteEmployee(db)
    
    //role function
    } else if (response.topMenu === 'View All Roles') {
        viewRoles(db);
    } else if (response.topMenu === 'Add Role') {
        addRole(db)
    } else if (response.topMenu === 'Update Role') {
        updateRole(db)
    } else if (response.topMenu === 'Delete Role') {
        deleteRole(db)
    
    //department function
    } else if (response.topMenu === 'View All Departments') {
        viewDepartments(db)
    } else if (response.topMenu === 'Add Department') {
        addDepartment(db)
    } else if (response.topMenu === 'Update Department') {
        updateDepartment(db)
    } else if (response.topMenu === 'Delete Department') {
        deleteDepartment(db)
    
    } else if (response.topMenu === 'Exit') {
        process.exit();
    }
}


module.exports = mainMenu;