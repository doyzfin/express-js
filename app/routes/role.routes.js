const { authJwt } = require("../middleware");

module.exports = (app) => {
  const roles = require("../controllers/role.controller");

  var router = require("express").Router();

  router.post("/", [authJwt.verifyToken], roles.createRole);

  app.use("/api/role", router);
};
