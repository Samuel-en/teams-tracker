import { prompt } from "inquirer";
import { createConnection } from "mysql";
import cTable, { getTable } from "console.table";
import figlet from "figlet";

// node.js driver for mysql 
var connection = createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'valentino92!',
  database : 'employeeTracker_db'
});
 
// establishing connection
connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    
  });

figlet("Employee Manager",  (err, data) => {
    if (err) {
      console.log("Issue");
      console.dir(err);
      return;
    }
console.log (data);

});

// prompts for user 
const promptStart = async () => {
    const { input } = await prompt([
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
        ]);
    switch (input) {
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
    }
  //   function to add employee 

  addEmployee = async () => {
    console.log("Adding a New Employee");
    try {
          const response = await prompt([
                  {
                      type: "input",
                      name: "firstName",
                      message: "What is the Employee's first name?",
                  },
                  {
                      type: "input",
                      name: "lastName",
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
              ]);
          console.log(response);
          connection.query(
              `INSERT INTO employees (firstName, lastName, role_id, manager_id, salary) VALUES (${response.first_name}, ${response.last_name}, ${response.role}, ${response.manager}, ${response.salary});`,
              response,
              (err, res) => {
                  if (err)
                      throw err;
                  console.log("New Employee Added!");
              }
          );

          promptUser();
      } catch (err_1) {
          console.log(err_1);
      }
};
//   function for adding new role 
addRole = async () => {
    console.log("Adding a new role.");
    try {
        const response = await prompt([
                {
                    type: "input",
                    name: "newRole",
                    message: "What is then name of the newly created role?",
                },
            ]);
        console.log(response);
        connection.query(`INSERT INTO role SET ?`, { title: response.newRole });
        console.log("New role added!");
        promptUser();
    } catch (err) {
        console.log(err);
    }
  };

//   function for adding new department 
addDepartment = async () => {
console.log("Adding a department.");
    try {
        const response = await prompt([
                {
                    type: "input",
                    name: "departmentName",
                    message: "What is then name of the newly created department?",
                },
            ]);
        console.log(response);
        connection.query(`INSERT INTO department (name) VALUES ("Marketing")`, {
            departmentName: response.departmentName,
        });
        console.log("New department added!");
        promptUser();
    } catch (err) {
        console.log(err);
    }
  };

//   function to view all employees 

Employees = () => {
console.log("View All Employees");
connection.query("select * from employee;", response, (err, res) => {
if (err) throw err;
console.table(res);
      
      promptStart();
    });
  };
  
//   view all departments
  Department = () => {
  console.log("View All Employees by Department");
  connection.query("SELECT * FROM department;", response, (err, res) => {
  if (err) throw err;
  cTable(res);
  promptUser();
    });
  };

//   function to view all roles 
  Roles = () => {
    connection.query("SELECT title FROM role", (err, res) => {
      if (err) throw err;
      const table = getTable(res);
      console.log(table);
    });

    function updateEmployeeRole() {
        let newRole = {};
      
    connection.query(
    "SELECT employee.id, employee.firstName, employee.lastName, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee AS e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id",
    (err, res) => {
     if (err) throw err;
    prompt([
                
        {
        name: "updateEmployee",
        type: "list",
        message: "Which employee would you like to update?",
        choices: function () {
        let choiceArray = [];
        for (var i = 0; i < res.length; i++) {
        choiceArray.push(res[i].first_name);
        }
            return choiceArray;
                  },
                },
              ])
        .then((userInput) => {
        newEmployee.firstName = userInput.firstName;
        newEmployee.lastName = userInput.lastName;
                
        connection.query(
        "SELECT * FROM role WHERE title = ?",
        userInput.rolechoice,
        (err, res) => {
        if (err) throw err;
        
        newEmployee.role_id = res[0].id;

        connection.query(
        "UPDATE employee SET role_id = ? WHERE first_name = ?",
        [newRole.role_id, newRole.first_name],
        (err, res) => {
        if (err) throw err;
        }
        );
    }
        );

});
    });
};

  }

