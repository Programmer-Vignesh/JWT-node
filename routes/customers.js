const errors = require("restify-errors");
const Customer = require("../models/Customer");

module.exports = (server) => {
  // Get Customers
  server.get("/customers", (req, res, next) => {
    console.log("customer :", Customer);
    try {
      const Customers = Customer.find({});
      res.send(Customers);
      console.log("customers :", Customers);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError(err));
    }
  });

  // Get  Single Customer
  server.get("/customer/:id", (req, res, next) => {
    try {
      const Customers = Customer.findById(req.params.id);
      res.send(Customers);
      next();
    } catch (err) {
      return next(
        new errors.ResourceNotFoundError(
          `There is no customer with Id of ${req.params.id}`
        )
      );
    }
  });

  // Add Customers
  server.post("/customers", (req, res, next) => {
    if (!req.is("application/json")) {
      return next(new errors.InvalidContentError('Expects "application/json"'));
    }
    const { name, email, balance } = req.body;

    const customer = new Customer({
      name,
      email,
      balance,
    });
    try {
      const newCustomer = customer.save();
      res.send(201);
      next();
    } catch (err) {
      return next(new errors.InternalError(err.message));
    }
  });
};
