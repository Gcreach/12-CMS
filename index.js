const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'patriotsrule1',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  const questions = () => {
    inquirer.prompt([
  {
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View All Employees','Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
    name: 'choice'
}
    ])


  //Brings up the menu
.then((answers) => {

//goes through each of the answers
if (answers.choice === 'Add Employee') {
  addEmployee();
};

if (answers.choice === 'View All Employees') {
  viewAllEmployees();
  
};

if (answers.choice === 'Update Employee Role') {
updateEmployeeRole();
};

if (answers.choice === 'View All Roles') {
viewAllRoles();

};

if (answers.choice === 'Add Role') {
addRole();
 
};

if (answers.choice === 'View All Departments') {
viewAllDepartments();

};

if (answers.choice === 'Add Department') {
  addDeparment();
};

if (answers.choice === 'quit') {
  process.exit();
  };
  });
 }



async function addEmployee  () {
   await inquirer.prompt
     ([
      {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?"
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?"
        },
        {
          type: "input",
          name: "role",
          message: "What is the employee's role?"
        },
        {
        type: "input",
        name: "manager",
        message: "Who is the employee's manager?"
          }
    ]).then((data) => {
      console.log(data.role + data.manager);
      db.query('INSERT INTO employee SET ? ', {first_name: data.firstName, last_name: data.lastName, role_id: data.role, manager_id: data.manager},
      (err, res) => {
        viewAllEmployees();
        console.log('employee added!');
      });
    }
    );

  };

function viewAllEmployees () {
    db.query('SELECT * FROM employee', (err, results) => {
        console.table(results);
        return questions();
    });
};

 async function updateEmployeeRole ()  {
  await inquirer.prompt([
    {
      type: 'input',
      name: 'employee',
      message: 'Which employee do you want to update?'
    },
    {
      type: 'input',
      name: 'role',
      message: 'What role will this employee have?'
    },
  ])
  .then((data) => {
    db.query(`UPDATE employee SET role_id = ${data.role} WHERE id = ${data.employee}`, (err, res) => {
      console.log(data);
      viewAllEmployees();
      console.log("role updated!");
    }
    )
  });

 };

 function viewAllRoles () {
  db.query('SELECT * FROM roles', (err, results) => {
    console.table(results);
    return questions();
});
 };

function viewAllDepartments () {
   db.query('SELECT * FROM department', (err, results) => {
    console.table(results);
    return questions();
});
 };

async function addRole ()  {
 await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What role would you like to add?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary?'
    },
    {
      type: 'input',
      name: 'department',
      message: 'What is the department ID for this role?'
    }
  ])
  .then((data) => {
    db.query('INSERT INTO roles SET ?', {title: data.name, salary: data.salary, department_id: data.department},
  (err, res) => {
    viewAllRoles();
    console.log('Role added!');
  })
  }); 
 };

async function addDeparment  () {
await inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: 'What is the name of the department?'
    }
  ])
  .then((data) => {
    db.query('INSERT INTO department SET ?', {department_name: data.department}, (err, res) => {
      viewAllDepartments();
      console.log('Department added!');
    })
  });
 };

 questions();


 
  