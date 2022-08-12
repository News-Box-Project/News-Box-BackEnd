"use strict";

const axios = require("axios");
const categCache={};

async function handleCategory(req, res) {
  const categories = req.query.categories;
  const categUrl = `http://api.mediastack.com/v1/news?access_key=${process.env.API_KEY}&languages=en&categories=${categories}`;

  if (categCache[categories] !== undefined){
    res.status(200).send(categCache[categories]);
  }else {
    try {
      const axiosData = await axios.get(categUrl);
      const categData = axiosData.data.data.map((item) => new News(item));
      categCache[categories]=categData;    
      res.status(200).send(categData);
    } catch (error) {
      res.status(422).send(error.message);
    }
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
module.exports = { handleCategory };
