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

  //   functions for departements

  allEmployees = () => {
    console.log("View All Employees");
    connection.query("select * from employee;", response, (err, res) => {
      if (err) throw err;
      console.table(res);
      // connection.end();
      promptStart();
    });
  };
  

  employeesByDepartment = () => {
    console.log("View All Employees by Department");
    connection.query("SELECT * FROM department;", response, (err, res) => {
      if (err) throw err;
      cTable(res);
      promptUser();
    });
  };

  employeesByManager = () => {
    console.log("View All Employees by Manager.");
    connection.query("SELECT * FROM manager", response, (err, res) => {
      if (err) throw err;
      cTable(res);
      
      promptUser();
    });
  };


connection.end();
