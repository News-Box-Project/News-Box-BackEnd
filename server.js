"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios =require('axios');

const server = express();
server.use(cors());

const PORT = process.env.PORT || 3001;

//End points
//http://api.mediastack.com/v1/news?access_key=10396027d7341f9122e9dcfbc14078de&keywords=keywords&languages=en
server.get("/news",handleSearch);
server.get("/test", handleTest);
// http://api.mediastack.com/v1/news?access_key=10396027d7341f9122e9dcfbc14078de&languages=en&categories=health
server.get("/category",handleCategory);

//Handler Functions
function handleTest(req, res) {
  res.send("Test Test");
}
async function handleSearch ( req, res) {
  const keywords=req.query.keywords;
  const newsUrl=`http://api.mediastack.com/v1/news?access_key=${process.env.API_KEY}&keywords=${keywords}&languages=en`;
  try{
  const axiosData=await axios.get(newsUrl);
  const newsData=axiosData.data.data.map(item=>new News(item));
  res.status(200).send(newsData);
  console.log(newsData);
 
}
catch(error){
  res.status(500).send("There is no data");
}
  
  
  }

server.get("*", (req, res) => {
  res.status(404).send("Page not found !");
});
async function handleCategory(req,res){

  const categories=req.query.categories;
  const categUrl=`http://api.mediastack.com/v1/news?access_key=${process.env.API_KEY}&languages=en&categories=${categories}`;
  try {
    const axiosData= await axios.get(categUrl);
    const categData= axiosData.data.data.map(item=> new News(item));
    res.status(200).send(categData);
  } catch (error) {
    res.status(422).send(error.message);
  }
  

}
server.listen(PORT, () => console.log(`listening on ${PORT}`));

class News {
  constructor(obj){
    this.author=obj.author;
    this.title=obj.title;
    this.description=obj.description;
    this.url=obj.url;
    this.image=obj.image;
    this.category=obj.category;
    this.published_at=obj.published_at;
  }
}