const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Enter your password here, if any
    password: "",
    database: "companyDB"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    start();
  });

// Starting prompt, asks what the user wants to do
function start() {
    inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View employee's by role ",
        "View departments",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update employee role",
        "Exit"
      ]
    }).then(function (answer){
        switch (answer.action) {
            case "View all employees":
                viewEmployees();
                break;

            case "Add Employee":
                addEmployee();
                break;

            case "Add Department":
                  addDepartment();
                  break;
  

            case "Exit":
                connection.end();
                break;
        }
    })
}

// Views all employees
function viewEmployees (){
    console.log("hello")
}

// Adds employee
function addEmployee (){
  console.log("hello")
}

// Adds Departmemnt 
function addDepartment (){
  inquirer.prompt({
      name: "departmentName",
      message: "Enter the department name: "
  }).then (function (answer) {
    var query =  "INSERT INTO department SET ?"
    connection.query(query, { name: answer.departmentName }, function(err, res) {
      if (err) throw err;
      console.log("Successfully Added")
      console.log("------------------------------------------")
      start()
    })
  })

  }




