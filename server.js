'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const { handleSearch } = require("./modules/keywords");
const { handleCategory } = require("./modules/categories");

// test connect
app.get('/test', (request, response) => {

    response.send('test is ok :)')

})

// CRUD method
app.get('/news', readNews);
app.post('/news', addNews);
app.delete('/news/:_id', deleteNews);
app.put('/news/:_id', updatNews);


// read data from database by get method
function readNews(req, res) {

    newsModel.find({}, (error, data) => {
        if (error) console.log(`read from database have error:${error}`)
        else res.send(data);
    })
}

// add new news by post method 

function addNews(req, res) {
    const { newsAdd } = req.body;
    const news = new newsModel(newsAdd);
    news.save();
    res.status(201).json(news);
}

// delete news by delete method

function deleteNews(req, res) {
    const newsId = req.params._id;
    newsModel.findByIdAndDelete(newsId).then(record => {
        res.send(record)
    }).catch(error => {
        res.status(500).send(error.message);
    })
}

// update data  news bt put method
function updatNews(req, res) {
    const newsId = req.params._id;
    const { updata } = req.body;
    newsModel.findByIdAndUpdate(newsId, updata, { new: true }).then(record => {
        res.send(record);
    }).catch(error => {
        res.status(500).send(error.message);
    })
}




// connect mongoose atlas
mongoose.connect('mongodb+srv://qais-alsgher:qais123@cluster0.evdbsxk.mongodb.net/?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true
    });

const newsSchema = new mongoose.Schema({

    auther: String,
    title: String,
    description: String,
    url: String,
    image: String,
    category: String,
    published_at: String

})

const newsModel = mongoose.model('newModel', newsSchema);


const news1 = newsModel({
    auther: "qais alsgher",
    title: "qais alsgher",
    description: "qais alsgher",
    url: "qais alsgher",
    image: "qais alsgher",
    category: "qais alsgher",
    published_at: "qais alsgher"
})

// news1.save();

//End points
//http://api.mediastack.com/v1/news?access_key=10396027d7341f9122e9dcfbc14078de&keywords=keywords&languages=en
app.get("/apinews", handleSearch);
app.get("/test1", handleTest);
//http://api.mediastack.com/v1/news?access_key=10396027d7341f9122e9dcfbc14078de&languages=en&keywords=gaza&limit=100
app.get("/category", handleCategory);
app.get("*", (req, res) => {
  res.status(404).send("Page not found !");
});

//Handler Functions
function handleTest(req, res) {
  res.send("Test Test");
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));