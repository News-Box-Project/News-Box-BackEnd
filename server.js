"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { handleSearch } = require("./modules/keywords");
const { handleCategory } = require("./modules/categories");

const server = express();
server.use(cors());

const PORT = process.env.PORT || 3001;

//End points
//http://api.mediastack.com/v1/news?access_key=10396027d7341f9122e9dcfbc14078de&keywords=keywords&languages=en
server.get("/news", handleSearch);
server.get("/test", handleTest);
// http://api.mediastack.com/v1/news?access_key=10396027d7341f9122e9dcfbc14078de&languages=en&categories=health
server.get("/category", handleCategory);
server.get("*", (req, res) => {
  res.status(404).send("Page not found !");
});

//Handler Functions
function handleTest(req, res) {
  res.send("Test Test");
}

server.listen(PORT, () => console.log(`listening on ${PORT}`));
