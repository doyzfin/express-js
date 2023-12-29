const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");
const Role = db.role;
db.sequelize
  .sync()
  .then(() => {
    console.log("Drop and Resync Db");
    // initial();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });

//   Role.create({
//     id: 2,
//     name: "moderator",
//   });

//   Role.create({
//     id: 3,
//     name: "admin",
//   });
// }

var corsOption = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOption));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Express Application" });
});

require("./app/routes/tutorial.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Express running in port ${PORT}`);
});
