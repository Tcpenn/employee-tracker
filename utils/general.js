//functions to handle creating arrays for role, employee, department, and managers.

//employee creation function
function createEmployeeArr(result) {
    //creates an empty array to be returned
    const employeeArr = [];

    //loops through employee results to create an array of employee objects 
    for (let i = 0; i < result.length; i++) {
        let employeeName = result[i].first_name + ' ' + result[i].last_name;
        let employeeId = result[i].id;

        //Creates an employee object and pushes it to the array
        const employeeObj = {};
        employeeObj.name = employeeName;
        employeeObj.id = employeeId

        //pushes the new employee name to the array
        employeeArr.push(employeeObj);
    }

    return employeeArr;
};

//manager creation function
function createManagerArr(result) {
    //creates an empty array to be returned
    const managerArr = [];

    //loops through manager results and creates an array of manager objects
    for (let i = 0; i < result.length; i++) {
        let managerName = result[i].first_name + ' ' + result[i].last_name;
        let managerId = result[i].id;

        const managerObj = {};
        managerObj.name = managerName;
        managerObj.id = managerId;

        managerArr.push(managerObj);
    }

    return managerArr;
};

//role creation function
function createRoleArr(result) {
    //creates an empty array to be returned
    const roleArr = [];

    //loops through manager results and creates an array of role objects
    for (let i = 0; i < result.length; i++) {
        roleArr.push(result[i].title);
    }

    return roleArr;
};

//department creation function
function createDepartmentArr(result) {
    //creates an empty department array to be returned
    const departmentArr = [];

    //loops through department result and creates an array of role object
    for(let i = 0; i < result.length; i++) {
        departmentArr.push(result[i].name);
    }
     
    return departmentArr;
}

module.exports = {
    createEmployeeArr,
    createDepartmentArr,
    createRoleArr,
    createManagerArr
};