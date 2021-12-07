
const Employee = require("../models/employees");

exports.getAllEmployees = (req, res) => {
    Employee.find({})
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