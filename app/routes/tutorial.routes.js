const { authJwt } = require("../middleware");

module.exports = (app) => {
  const tutorials = require("../controllers/tutorial.controller");

  var router = require("express").Router();

  // Create new Tutorial
  router.post("/", [authJwt.verifyToken, authJwt.isAdmin], tutorials.create);

  // Retrieve all tutorial
  router.get("/", [authJwt.verifyToken, authJwt.isAdmin], tutorials.findAll);

  // Retrieve all tutorial published
  router.get("/published", tutorials.findAllPublished);

  // Retrieve tutorial by id
  router.get("/:id", tutorials.findOne);

  // Update tutorial by id
  router.put("/:id", tutorials.update);

  // Delete tutorial by id
  router.delete("/:id", tutorials.delete);

  // Delete all tutorial
  router.delete("/", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};
