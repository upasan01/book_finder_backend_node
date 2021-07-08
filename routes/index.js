var express = require('express');
var router = express.Router();
let entries = require('./entries')
const cors = require('./cors');

/* GET home page. */
router.options('/',cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
router.get('/', cors.cors, function(req, res, next) {
  res.statusCode = 200;
  res.end('<h1>Hello from the backend!</h1>');
});

router.put('/', cors.corsWithOptions, function(req, res, next) {
  res.statusCode = 403;
  res.end('<h1>PUT operation is not supported</h1>');
});

router.post('/', cors.corsWithOptions, function(req, res, next) {
  res.statusCode = 403;
  res.end('<h1>POST operation is not supported</h1>');
});

router.delete('/', cors.corsWithOptions, function(req, res, next) {
  res.statusCode = 403;
  res.end('<h1>DELETE operation is not supported</h1>');
});

//-----------------------------------------------------------------

router.options('/getAllBooks', cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
router.get('/getAllBooks', cors.cors, function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.json(entries.getAllEntries())
});

router.put('/getAllBooks', cors.corsWithOptions, function(req, res, next) {
  res.statusCode = 403;
  res.end('<h1>PUT operation is not supported</h1>');
});

router.post('/getAllBooks', cors.corsWithOptions, function(req, res, next) {
  res.statusCode = 403;
  res.end('<h1>POST operation is not supported</h1>');
});

router.delete('/getAllBooks', cors.corsWithOptions, function(req, res, next) {
  res.statusCode = 403;
  res.end('<h1>DELETE operation is not supported</h1>');
});

//-----------------------------------------------------------------

router.options('/addBooks', cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

router.get('/addBooks', cors.cors, function(req, res, next) {
  res.statusCode = 403;
  res.end('<h1>GET operation is not supported</h1>');
});

router.put('/addBooks', cors.corsWithOptions, function(req, res, next) {
  res.statusCode = 403;
  res.end('<h1>PUT operation is not supported</h1>');
});


router.post('/addBooks', cors.corsWithOptions, function(req, res, next) {
  try{
    var id = entries.getLastID() + 1;
    var title = req.body.title;
    var author = req.body.author;
    var pdate = req.body.pdate;
    var tags = req.body.tags;
    tags = tags.map(tags => tags.toLowerCase())

    data = {}
    data ={
      "id": id,
      "title": title,
      "author": author,
      "pdate": pdate,
      "tags": tags
    }
    entries.putEntry(data)
		res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.json({status: "success"})
  }
  catch(err){
    next(err)
  }
});

router.delete('/addBooks',cors.corsWithOptions, function(req, res, next) {
  res.statusCode = 403;
  res.end('<h1>DELETE operation is not supported</h1>');
});

//-----------------------------------------------------------------

router.options('/search',cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

router.get('/search', cors.cors, function(req, res, next) {
  res.statusCode = 403;
  res.end('<h1>GET operation is not supported</h1>');
});

router.put('/search', cors.corsWithOptions, function(req, res, next) {
  res.statusCode = 403;
  res.end('<h1>PUT operation is not supported</h1>');
});

router.post('/search', cors.corsWithOptions, function(req, res, next){
  try{
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.json(entries.searchEntry(req.body.tags.toLowerCase()))
}
  catch(err){
    next(err)
  }
});

router.delete('/search', cors.corsWithOptions, function(req, res, next) {
  res.statusCode = 403;
  res.end('<h1>DELETE operation is not supported</h1>');
});

module.exports = router;
