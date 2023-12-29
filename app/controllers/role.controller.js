const db = require("../models");
const Role = db.role;

exports.createRole = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name cannot empty !",
    });
    return;
  }

  let body = {
    name: req.body.name,
  };

  Role.create(body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the Role",
      });
    });
};
