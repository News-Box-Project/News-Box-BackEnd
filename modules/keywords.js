"use strict";

const axios = require("axios");
// const { News } = require("./News");

async function handleSearch(req, res) {
  const keywords = req.query.keywords;
  const newsUrl = `http://api.mediastack.com/v1/news?access_key=${process.env.API_KEY}&keywords=${keywords}&languages=en`;
  try {
    const axiosData = await axios.get(newsUrl);
    const newsData = axiosData.data.data.map((item) => new News(item));
    res.status(200).send(newsData);
    console.log(newsData);
  } catch (error) {
    res.status(422).send(error.message);
  }
}

class News {
  constructor(obj) {
    this.author = obj.author;
    this.title = obj.title;
    this.description = obj.description;
    this.url = obj.url;
    this.image = obj.image;
    this.category = obj.category;
    this.published_at = obj.published_at;
  }
}

module.exports = { handleSearch };
