DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

/* creates deparment table */
CREATE TABLE deparments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

/* creates role table */
CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (30),
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL, 
    /* This needs to be a FK */
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES departments(id)
);

/* creates employee table */
CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INTEGER, /* This needs to be a FK */
    is_manager BOOLEAN NOT NULL,
    manager_id INTEGER /* This needs to be a FK */
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id)
);

