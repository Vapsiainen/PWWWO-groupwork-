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
    },
    new: (req, res) => {
        res.render("employees/new");
    },
    create: (req, res, next) => {
        let employeeParams = {
            name: req.body.name,
            email: req.body.email,
            department: req.body.department
        };
        Employee.create(employeeParams)
            .then(employee => {
                res.locals.redirect = "/employees";
                res.locals.employee = employee;
                next();
            })
            .catch(error => {
                console.log(`Error saving employee: ${error.message}`);
                next(error);
            });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    show: (req, res, next) => {
        let employeeId = req.params.id;
        Employee.findById(employeeId)
            .then(employee => {
                res.locals.employee = employee;
                next();
            })
            .catch(error => {
                console.log(`Error fetching employee by ID: ${error.message}`);
                next(error);
            });
    },
    showView: (req, res) => {
        res.render("employees/show");
    },
    edit: (req, res, next) => {
        let employeeId = req.params.id;
        Employee.findById(employeeId)
            .then(employee => {
                res.render("employees/edit", {
                    employee: employee
                });
            })
            .catch(error => {
                console.log(`Error fetching employee by ID: ${error.message}`);
                next(error);
            });
    },
    update: (req, res, next) => {
        let employeeId = req.params.id,
            employeeParams = {
                name: req.body.name,
                email: req.body.email,
                department: req.body.department
            };

        Employee.findByIdAndUpdate(employeeId, {
                $set: employeeParams
            })
            .then(employee => {
                res.locals.redirect = `/employees/${employeeId}`;
                res.locals.employee = employee;
                next();
            })
            .catch(error => {
                console.log(`Error fetching employee by ID: ${error.message}`);
            });
    },
    delete: (req, res, next) => {
        let employeeId = req.params.id;
        Employee.findByIdAndRemove(employeeId)
            .then(() => {
                res.locals.redirect = "/employees";
                next();
            })
            .catch(error => {
                console.log(`Error deleting employee by ID: ${error.message}`);
                next();
            });
    }
};