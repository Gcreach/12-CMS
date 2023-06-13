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



  function command () {
  const questions =
  {
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View All Employees','Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
    name: 'choice'
};

inquirer.prompt(questions)
.then((answers) => {

if (answers.choice === 'Add Employee') {
  console.log("Add employee");
  addEmployee();
}

else if (answers.choice === 'View All Employees') {
  console.log("view employee");
  viewAllEmployees();
  
}

else if (answers.choice === 'Update Employee Role') {
  console.log("update employee");
updateEmployeeRole();

}

else if (answers.choice === 'View All Roles') {
  console.log("view role");
viewAllRoles();

}

else if (answers.choice === 'Add Role') {
  console.log("Add role");
addRole();
 
}

else if (answers.choice === 'View All Departments') {
  console.log("View department");
viewAllDepartments();

}

else if (answers.choice === 'Add Department') {
  console.log("add department");
  addDeparment();
}

else if (answers.choice === 'quit') {
  console.log("quit");
  process.exit();
}

});
  }



function addEmployee () {
   inquirer.prompt
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
      db.query('INSERT INTO employee SET ? ', {first_name: data.firstName, last_name: data.lastName, role: data.role, manager: data.manager},
      (err, res) => {
        viewAllEmployees();
        console.log('employee added!');
      })
    }
    )
    command(); 
  }

  function viewAllEmployees () {
    db.query('SELECT * FROM employee', (err, results) => {
      console.table(results);
  });
  command(); 
  }

 function updateEmployeeRole () {
  inquirer.prompt([
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
    db.query(`UPDATE employee SET role_id = ${data.role} WHERE id = ${data.employee}`, (err,) => {
      viewAllEmployees();
      console.log("role updated!");
    }
    )
  })
  command(); 
 }

 function viewAllRoles () {
  db.query('SELECT * FROM roles', (err, results) => {
    console.table(results);
});
command(); 
 }

 function viewAllDepartments () {
  db.query('SELECT * FROM department', (err, results) => {
    console.table(results);
});
command(); 
 }

 function addRole () {
  inquirer.prompt([
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
  command(); 
 }


 function addDeparment () {
  inquirer.prompt([
    {
      type: 'input',
      name: 'deparment',
      message: 'What is the name of the department?'
    }
  ])
  .then((data) => {
    db.query('INSERT INTO department SET ?', {department_name: data.department}, (err, res) => {
      viewAllDepartments();
      console.log('Department added!');
    })
  })
  command(); 
 }

 command();


 
  