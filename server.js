const express = require("express");
const serverConfig = require("./configs/server.config.js");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config.js");
const userModel = require("./models/user.model.js");


//create a new instance of Express application
const app = express();

/**
 * Logic to connect to Mongodb and create an ADMIN  user
 * Need to have the mongodb up and running in your local machine
 */

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on("error", () => {
  console.log("Error while connecting to DB");
});

db.once("open", () => {
  console.log("DB is Connected");

  init();
});

async function init() {
  /**
   * check If the admin user is already present
   */

  let admin = await userModel.findOne({
    userId: "admin",
  });

  if (admin) {
    console.log("Admin user already present");
    return;
  }

  /**
   * Initialize the mongo DB
   *
   * Need to Create the ADMIN user
   */

  admin = await userModel.create({
    name: "sakshi",
    userId: "admin",
    email: "sakshiasjkj@gmail.com",
    userType: "ADMIN",
    password: "Welcome123",
  });

  console.log(admin);
}

app.listen(serverConfig.PORT, () => {
  console.log(`server started on the port number ${serverConfig.PORT}`);
});
