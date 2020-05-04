const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

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
        "Add Department",
        "Add Role",
        "Add Employee",
        "View all employees",
        "View roles",
        "View departments",
        "Delete employee",
        "Exit"
      ]
    }).then(function (answer){
        switch (answer.action) {
            case "View all employees":
                viewEmployees();
                break;

            case "View roles":
              viewRoles();
              break;

            case "View departments":
              viewDepartments();
              break;

            case "Add Employee":
                addEmployee();
                break;

            case "Add Department":
                  addDepartment();
                  break;

            case "Add Role":
                addRole();
                break;

            case "Delete employee":
              deleteEmployee();
              break;
  
            case "Exit":
                connection.end();
                break;
        }
    })
}

// Views all employees
function viewEmployees (){
    
    connection.query("SELECT * FROM employee", function (err, result) {
      if (err) throw err;
      console.log("------------------------------------------")
      console.table(result)
      console.log("------------------------------------------")
      start()
    })
}

// Views all roles
function viewRoles () {
  connection.query("SELECT * FROM role" , function (err, result){
    if(err) throw err;
    console.log("------------------------------------------")
    console.table(result)
    console.log("------------------------------------------")
    start()
  })
}

// Views all departments
function viewDepartments() {
  connection.query("SELECT * FROM department", function(err,result){
    if(err) throw err;
    console.log("------------------------------------------")
    console.table(result)
    console.log("------------------------------------------")
    start()
  })
}

// Adds employee
function addEmployee (){
    
    connection.query("SELECT * FROM role", function (err, result) {
    if (err) throw err;
      inquirer.prompt([
        {
          name: "firstName",
          message: "What is the employee's first name? "
        },
        {
          name: "lastName",
          message: "What is the employee's last name? "
        },
        {
          // Gets lists of roles from database
            type: "list",
            name: "chooseRole",
            message: "Which role is this employee in?",
            choices: function (){
              var choiceRole = []
              for (var i = 0; i < result.length; i++){
                choiceRole.push(result[i].title);
              }
              return choiceRole
            }
        }]).then (answer => {
          // Gets chosen role into a variable
          var chosenRole;
          for (var i = 0; i < result.length; i++) {
            if (result[i].title === answer.chooseRole){
              chosenRole = result[i];
            }
          }
          // Insert employee into database
          var query = "INSERT INTO employee SET ?"
          connection.query(query, {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: chosenRole.id
          }, function (err, res) {
            if (err) throw err;
            console.log("------------------------------------------")
            console.log("Successfully Added")
            console.log("------------------------------------------")
            start()
          }
          )

        })
    })
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
      console.log("------------------------------------------")
      console.log("Successfully Added")
      console.log("------------------------------------------")
      start()
    })
  })

  }

// Adds Role
function addRole (){
  connection.query("SELECT * FROM department", function (err, result) {
    if (err) throw err;
    inquirer
    .prompt([
        {
            name: "roleTitle",
            message: "Enter the role title: "
        },
        {
            type: "number",
            name: "roleSalary",
            message: "Enter the salary for this role (no commas): "
        },
        {
          // Gets list of departments from database
            type: "list",
            name: "chooseDepartment",
            message: "Which department is this role in?",
            choices: function () {
              var choiceDepart = [];
              for (var i = 0; i < result.length; i++) {
                choiceDepart.push(result[i].name);
            }
              return choiceDepart
            }
          }]).then (answer => {
            // Gets chosen department into a variable
           var chosenDepart;
           for (var i = 0; i < result.length; i++) {
            if (result[i].name === answer.chooseDepartment) {
                chosenDepart = result[i];
            }
          }
          // Insert into database
          var query = "INSERT INTO role SET ?"
          connection.query(query, {
            title: answer.roleTitle,
            salary: answer.roleSalary,
            department_id: chosenDepart.id 
          }, function (err, res) {
              if (err) throw err;
              console.log("------------------------------------------")
              console.log("Successfully Added")
              console.log("------------------------------------------")
              start()
            }
           )
       })
    })
}


// Deletes employee
function deleteEmployee() {
  connection.query("SELECT * FROM employee", function (err, result) {
   
    if (err) throw err;
    var choiceEmployee = []
    for (var i in result) {
      choiceEmployee.push(`ID: ${result[i].id} || Name: ${result[i].first_name} ${result[i].last_name}`);
  }
  inquirer.prompt({ 
    type: "list",
    name: "chooseEmployee",
    message: "Which employee do you want to delete?",
    choices: choiceEmployee,

}).then (res => {

  let chosen;
  for (var i = 0; i < result.length; i++) {
    if (choiceEmployee.id === res.chooseEmployee.id) {
      chosen = result[i];
  
    }
  }

  connection.query ( "DELETE FROM employee WHERE id =?", [chosen.id], function(err, response){
   
    if (err) throw err;
    console.log("------------------------------------------")
    console.log("Successfully Deleted")
    console.log("------------------------------------------")
    start()
  })
})
  })

}