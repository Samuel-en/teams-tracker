const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const figlet = require("figlet");

// node.js driver for mysql 
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'valentino92!',
  database : 'employeeTracker_db'
});
 
connection.connect();
 
// establishing connection
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

figlet("Employee Manager", function (err, data) {
    if (err) {
      console.log("Issue");
      console.dir(err);
      return;
    }

// prompts for user 
const promptStart = () => {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "input",
          message: "What would you like to do?",
          choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee",
            "Update Employee Role",
            "Update Employee Manager",
          ],
        },
      ])
      .then(({ selection }) => {
        switch (selection) {
          case "Add a new Department":
            addDept();
            break;
          case "Add a new Role":
            addRole();
            break;
          case "Add a new Employee":
            addEmployee();
            break;
          case "View All Departments":
            viewAllDept();
            break;
          case "View All Roles":
            viewRoles();
            break;
          case "View All Employees":
            viewEmployees();
            break;
          case "Update an Employee Role":
            updateEmployeeRole();
            break;
          case "Exit":
            exit();
          default:
            console.log("Have a great day!");
        }
      });
  }

//   function to add employee 

  addEmployee = () => {
    console.log("Adding a New Employee");
    return inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the Employee's first name?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the Employee's Last Name",
        },
        {
          type: "list",
          name: "role",
          message: "What is the Employees's Role?",
        },
        {
          type: "list",
          name: "manager",
          message: "Who is the Employees's Manager?",
        },
        {
          type: "number",
          name: "salary",
          message: "What is the Employee's Salary?",
        },
      ])
      .then((response) => {
        console.log(response);
        connection.query(
          `INSERT INTO employees (first_name, last_name, role_id, manager_id, salary) VALUES (${response.first_name}, ${response.last_name}, ${response.role}, ${response.manager}, ${response.salary});`,
          response,
          (err, res) => {
            if (err) throw err;
            console.log("New Employee Added!");
          }
        );

        promptUser();
    })
    .catch((err) => {
      console.log(err);
    });
};
  
addRole = () => {
    console.log("Adding a new role.");
    return inquirer
      .prompt([
        {
          type: "input",
          name: "newRole",
          message: "What is then name of the newly created role?",
        },
      ])
      .then((response) => {
        console.log(response);
        connection.query(`INSERT INTO role SET ?`, { title: response.newRole });
        console.log("New role added!");
        promptUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addDepartment = () => {
    console.log("Adding a department.");
    return inquirer
      .prompt([
        {
          type: "input",
          name: "department_name",
          message: "What is then name of the newly created department?",
        },
      ])
      .then((response) => {
        console.log(response);
        connection.query(`INSERT INTO department (name) VALUES ("Marketing")`, {
          department_name: response.department_name,
        });
        console.log("New department added!");
        promptUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  connection.end();