//dependencies 
const router = express.router();
const db = require('../db/connection');

//department routes

//get route
router.get('/departments', (req, res) =>{
    const sql = `SELECT * FROM department`;
    
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).status({ err: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//post route

// role route
//get routes
router.get('/roles', (req, res) => {
    const sql = `SELECT from  *, department.name AS department
                FROM roles
                JOIN department ON roles.department_id = departments.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(400).status({ err: error.message });
            return;
        }
        res.json({ 
            message:'success',
            data: rows
        });
    });
});

//employee route
//get route
router.get('/employees', (req, res) => {
    const sql = `SELECT a.id, a.first_name, a.last_name, roles.title AS role, departments.name AS department, roles.salary, CONCAT(b.first_name, " ", b.last_name) AS manager, a.is_manager
                 FROM employees a LEFT JOIN employees b
                 ON a.manager_id = b.id
                 JOIN roles
                 ON a.role_id = roles.id
                 JOIN departments
                 ON roles.department_id = departments.id`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(400).json({error: err.message});
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });