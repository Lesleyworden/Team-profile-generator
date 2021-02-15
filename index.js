const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    
    // Your port; if not 3306
    port: 3306,
    
    // Your username
    user: "root",
    
    // Your password
    password: "admin",
    database: "employee_db"
});

// Connect to database.
connection.connect(function(err)
{
    if(err) throw err;
    mainMenu();
    
});

// Ask the user what they want to do.
function mainMenu ()
{
    inquirer.prompt(
    {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add a department, role, or employee.",
            "View departments, roles, or employees.",
            "Update an employee.",
            "exit"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case "Add a department, role, or employee.":
                // Ask the questions for the operation.
                addQuestions();
            break;
            
            case "View departments, roles, or employees.":
                // Ask the questions for the operation.
                viewQuestions();
            break;
            
            case "Update an employee.":
                // Ask the questions for the operation.
                updateEmployee();
            break;
            
            case "exit":
                // Close the connection to the database.
                connection.end();
            break;
        }
    });
}

// Ask the user what they want to add.
function addQuestions ()
{
    inquirer.prompt(
    {
        name: "action",
        type: "list",
        message: "What would you like to add?",
        choices: [
            "Add a department.",
            "Add a role.",
            "Add an employee.",
            "back"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case "Add a department.":
            // Ask more questions.
                addDepartment();
            break;
            
            case "Add a role.":
            // Ask more questions.
                addRole();
            break;
            
            case "Add an employee.":
            // Ask more questions.
                addEmployee();
            break;
            
            case "back":
            // Go back to the main menu.
                mainMenu();
            break;
            
            default:
                mainMenu();
            break;
        }
    });
}
// Ask the user what they want to view.
function viewQuestions ()
{
    inquirer.prompt(
    {
        name: "action",
        type: "list",
        message: "What would you like to view?",
        choices: [
            "View a department.",
            "View a role.",
            "View an employee.",
            "back"
        ]
    })
    .then(async function(answer) {
        switch (answer.action) {
            case "View a department.":
            viewDepartment();
            break;
            
            case "View a role.":
            // Add function call for viewing a role.
            viewRole();
            break;
            
            case "View an employee.":
            // Add function call for viewing a employee.
            viewEmployee();
            break;
            
            case "back":
            // Go back to the main menu.
            mainMenu();
            break;
        }
    });
}
// Ask the user what they want to update. !Currently unused!
function updateQuestions ()
{
    inquirer.prompt(
        {
            name: "action",
            type: "list",
            message: "What would you like to update?",
            choices: [
                // "Update a department.",
                // "Update a role.",
                "Update an employee.",
                "back"
            ]
        })
        .then(async function(answer) {
            switch (answer.action) {
                case "Update a department.":
                updateDepartment();
                break;
                
                case "Update a role.":
                // Add function call for viewing a role.
                updateRole();
                break;
                
                case "Update an employee.":
                // Add function call for viewing a employee.
                updateEmployee();
                break;
                
                case "back":
                // Go back to the main menu.
                mainMenu();
                break;
            }
        });
}



//#region Add functions
// Role
function addRole()
{
    const questions = [
        {
            type : 'input',
            name : 'title',
            message : 'What is the title of this role?'
        },
        {
            type : 'number',
            name : 'salary',
            message : 'What is the salary of this role?'
        },
        {
            type : 'number',
            name : 'departmentID',
            message : 'What is the department ID this role is associated with?'
        }
    ];
    askMultipleQuestions(questions, (answers)=>
    {
        // SQL statement to create the role in the table.
        const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
        const conn = connection.query(query, [answers.title, answers.salary, answers.departmentID] , function(err, res) 
        {
            if (err) throw err;
            console.log('Role has been added.');
            console.table(conn.sql);
            console.table([answers]);

            askAgain("Would you like to add another?", () => {
                addRole();
            });
        });
    });
}
// Department
function addDepartment()
{
    const questions = [
        {
            type : 'input',
            name : 'title',
            message : 'What is the title of this department?'
        }
    ];
    askMultipleQuestions(questions, (answer)=>
    {
        // SQL statement
        const query = 'INSERT INTO departments (name) VALUES (?)';
        const conn = connection.query(query, [answer.title] , function(err, res) 
        {
            if (err) throw err;
            console.log('Department has been added.');
            console.table(conn.sql);
            console.table([answer]);
            
            askAgain("Would you like to add another?", () => {
                addDepartment();
            });
        });
    });
}
// Employee
function addEmployee()
{
    const questions = [
        {
            type : 'input',
            name : 'firstName',
            message : 'What is the employee\'s first name?'
        },
        {
            type : 'input',
            name : 'lastName',
            message : 'What is the employee\'s last name?'
        },
        {
            type : 'number',
            name : 'roleID',
            message : 'What is the role ID this employee is associated with?'
        },
        {
            type : 'number',
            name : 'managerID',
            message : 'What is the manager ID this employee is associated with?'
        }
    ];
    askMultipleQuestions(questions, (answer)=>
    {
        // SQL statement
        const query = 'INSERT INTO employees (firstname, lastname, role_id, manager_id) VALUES (?,?,?,?)';
        const conn = connection.query(query, [answer.firstName, answer.lastName, answer.roleID, answer.managerID] , function(err, res) 
        {
            if (err) throw err;
            console.log('Employee has been added.');
            console.table(conn.sql);
            console.table([answer]);
            
            askAgain("Would you like to add another?", () => {
                addEmployee();
            });
        });
    });
}
//#endregion
//#region View functions
// Role
function viewRole()
{
    askOneQuestion("What is the name of the role you want to view? Leave blank to see all.", (answer)=>
    {
        const query = answer.userInput ? 'SELECT * FROM roles WHERE title = ?' : 'SELECT * FROM roles';
        const conn = connection.query(query, [answer.userInput], function(err, res) 
        {
            if (err) throw err;
            console.table(conn.sql);
            console.table(res);
            

            askAgain("Would you like to view another?", () => {
                viewRole();
            });
        });
    });
}
// Department
function viewDepartment()
{
    askOneQuestion("What is the name of the department you want to view? Leave blank to see all.", (answer)=>
    {
        const query = answer.userInput ? "SELECT * FROM departments WHERE name = ?" : 'SELECT * FROM departments';
        const conn = connection.query(query, [ answer.userInput ], function(err, res) 
        {
            if (err) throw err;
            console.table(conn.sql);
            console.table(res);
            
            askAgain("Would you like to view another?", () => {
                viewDepartment();
            });
        });
    });
}
// Employee
function viewEmployee()
{
    askOneQuestion("What is the first name of the employee you want to view? Leave blank to see all.", (answer)=>
    {
        const query = answer.userInput ? "SELECT * FROM employees WHERE firstname = ?" : 'SELECT * FROM employees';
        const conn = connection.query(query, [  answer.userInput ], function(err, res) 
        {
            if (err) throw err;
            console.table(conn.sql);
            console.table(res);
            
            askAgain("Would you like to view another?", () => {
                viewEmployee();
            });
        });
    });
}
//#endregion
//#region Update functions
// Role !Currently unused!
function updateRole()
{
    askOneQuestion("What is the name of the role you want to update?", (answer)=>
    {
        const query = answer.userInput ? 'SELECT * FROM roles WHERE title = ?' : 'SELECT * FROM roles';
        connection.query(query, [answer.userInput], function(err, res) 
        {
            if (err) throw err;
            console.table(res);
        });

        const questions = [
            {
                type : 'input',
                name : 'title',
                message : 'What is the updated title of this role?'
            },
            {
                type : 'number',
                name : 'salary',
                message : 'What is the updated salary of this role?'
            },
            {
                type : 'number',
                name : 'departmentID',
                message : 'What is the updated department ID this role is associated with?'
            }
        ];
        askMultipleQuestions(questions, (answers)=>
        {
            // SQL statement to create the role in the table.
            const query = 'UPDATE roles SET ? WHERE title = ?';
            connection.query(query, [{title : answers.title, salary : answers.salary, department_id : answers.departmentID}, answer.title] , function(err, res) 
            {
                if (err) throw err;
                console.log('Role has been updated.');
                console.table([answers]);
    
                askAgain("Would you like to updated another?", () => {
                    updateRole();
                });
            });
        });
    });
}
// Department !Currently unused!
function updateDepartment()
{
    askOneQuestion("What is the name of the department you want to update?", (answer)=>
    {
        console.log(answer.userInput);

        
        askAgain("Would you like to update another?", () => {
            updateDepartment();
        });
    });
}
// Employee
function updateEmployee()
{
    askOneQuestion("What is the id of the employee you want to update? Leave blank to see all.", (answer)=>
    {
        const query = answer.userInput ? 'SELECT * FROM employees WHERE id = ?' : 'SELECT * FROM employees';
        const conn = connection.query(query, [answer.userInput], function(err, res) 
        {
            if (err) throw err;
            console.table(conn.sql);
            console.table(res);

            if(query === 'SELECT * FROM employees')
            {
                updateEmployee();
                return;
            }

            const questions = [
                {
                    type : 'input',
                    name : 'firstName',
                    message : 'What is the updated first name of this employee?'
                },
                {
                    type : 'input',
                    name : 'lastName',
                    message : 'What is the updated last name of this employee?'
                },
                {
                    type : 'number',
                    name : 'roleID',
                    message : 'What is the updated role ID this employee is associated with?'
                },
                {
                    type : 'number',
                    name : 'managerID',
                    message : 'What is the updated manager ID this employee is associated with?'
                }
            ];
            askMultipleQuestions(questions, (answers)=>
            {
                // SQL statement to create the role in the table.
                const query = 'UPDATE employees SET ? WHERE id = ?';
                const conn = connection.query(query, [{firstname : answers.firstName, lastname : answers.lastName, role_id : answers.roleID, manager_id : answers.managerID}, answer.userInput] , function(err, res) 
                {
                    if (err) throw err;
                    console.log('Employee has been updated.');
                    console.log(conn.sql);
                    console.table([answers]);
        
                    askAgain("Would you like to updated another?", () => {
                        updateEmployee();
                    });
                });
            });
        });

        

        
    });
}
//#endregion

//#region Helpers
// Asks the user if they want to repeat then calls the passed function.
function askAgain (question, callback)
{
    inquirer.prompt({
        name: "answer",
        type: "confirm",
        message : question
    }).then(function (answer)
    {
        if(answer.answer)
        {
            callback();
        }
        else
        {
            // Go back to the home page.
            mainMenu();
        }
    });

}

// Asks for user input then passes that data to the callback.
function askOneQuestion(question, callback) {
    inquirer.prompt({
        name: "userInput",
        type: "input",
        message: question
    })
    .then((answer) => callback(answer));
}

// Asks multiple questions then builds an object of answers to pass to the callback.
function askMultipleQuestions(questionsArray, callback) {
    inquirer.prompt(questionsArray)
    .then((answer) => callback(answer));
}
//#endregion