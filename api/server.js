const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

//server
const server = express();

//import routers
const welcomeRouter = require("../welcome/welcome-router");
const actionRouter = require("./actions/actions-router");
const projectRouter = require("./projects/projects-router");

//Global middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

//Server endpoints --------->
server.use("/", welcomeRouter);
server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter);

module.exports = server;
