const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: content } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, content, totalPages, currentPage };
};

// Create and save new tutorial
exports.create = (req, res) => {
  // validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  // create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save tutorial to db
  Tutorial.create(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the Tutorial",
      });
    });
};

// Retrieve all tutorial in database
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Tutorial.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the Tutorial",
      });
    });
};

// Find a single tutotial with id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id: ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving Tutorial by id: ${id}`,
      });
    });
};

// Update tutorial by the id request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated.",
        });
      } else {
        res.send({
          message: `Cannot Update data id: ${id}, tutorial not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error Updating with id: ${id}`,
      });
    });
};

// Delete tutorial by id request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial has deleted.",
        });
      } else {
        res.send({
          message: `Cannot Update data id: ${id}, tutorial not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Cannot delete with id: ${id}`,
      });
    });
};

// Delete all data in database
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Tutorial was deleted` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error when deleted Tutorial",
      });
    });
};

// Find all published tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error when retrieved data",
      });
    });
};
