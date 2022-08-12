"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const server = express();
server.use(cors());

const PORT = process.env.PORT || 3001;

//End points
server.get("/test", handleTest);

//Handler Functions
function handleTest(req, res) {
  res.send("Test Test");
}

server.get("*", (req, res) => {
  res.status(500).send("No Request");
});

server.listen(PORT, () => console.log(`listening on ${PORT}`));
