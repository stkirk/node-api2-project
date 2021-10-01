// implement your server here
const express = require("express");
const server = express();
server.use(express.json());

// require your posts router and connect it here

//Catchall endpoint
server.use("*", (req, res) => {
  res.status(404).json({ message: "Error 404: Not Found" });
});

module.exports = server;
