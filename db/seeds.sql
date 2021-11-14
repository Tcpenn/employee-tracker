INSERT INTO department (name)
VALUES
    ('JavaScript Dept'),
    ('CSS Dept'),
    ('HTML Dept'),
    ('SQL Dept'); 

INSERT INTO role (title, salary, department_id)
VALUES
    ('JavaScript Tech', 50000, 1),
    ('CSS Tech', 40000, 2),
    ('HTML Tech', 40000, 3),
    ('SQL Tech', 40000, 4),
    ('JavaScript Manager', 80000, 1),
    ('CSS Manager', 70000, 2),
    ('HTML Manager', 70000, 3),
    ('SQL Manager', 60000, 4);

INSERT INTO employee (id, first_name, last_name, department_id, role_id, manager_id)
VALUES
    (101, 'Ronald', 'Mcdonald', 1, 5, NULL), /* JavaScript manager */
    (102, 'Bill', 'Gates', 2, 6, NULL), /* CSS manager */
    (103, 'Jackson', 'Smith', 3, 7, NULL), /* HTML manager */
    (104, 'Trent', 'Mathers', 4, 8, NULL), /* SQL manager */
    (302, 'Warner', 'Brothers', 1, 1, 101),
    (401, 'Dan', 'Elliston', 1, 1, 101),
    (501, 'Lula', 'Braxton', 2, 2, 102),
    (551, 'Aura', 'Tennison', 4, 4, 104),
    (552, 'Liliana', 'Cason', 3, 3, 103),
    (553, 'Boyd', 'Sergeant', 3, 3, 103),
    (554, 'Flinn', 'LockWood', 2, 2, 102);
