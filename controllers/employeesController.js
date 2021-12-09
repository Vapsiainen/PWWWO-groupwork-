const Employee = require("../models/employees");

module.exports = {
    index: (req, res, next) => {
        Employee.find({})
        .then(employees => {
            res.locals.employees = employees;
            next();
        })
        .catch(error => {
            console.log(`Error fetching employees: ${error.message}`)
            next(error);
        });
    },
    indexView: (req, res) => {
        res.render("employees/index");
    }
};

exports.getAllEmployees = (req, res) => {
    employees.find({})
        .exec()
        .then((employees) => {
            res.render("employees", {
                employees: employees
            });
        })
        .catch((error) => {
            console.log(error.message);
            return [];
        });
};
