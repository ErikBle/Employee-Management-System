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
    password: "Appleroof515!",
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

            case "Exit":
                connection.end();
                break;
        }
    })
}

function viewEmployees (){
    console.log("Employee here")
}

