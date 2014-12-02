var express = require('express');
var router = express.Router();

// Records all the posts made to the server.
var comments = [];
var pinnData = [];

// Represents a post:
function Comment(text) {
  this.text = text;
  this.date = new Date();
}

function Pinn(eventname, eventdesc, eventk, eventB){
	this.eventname = eventname;
	this.eventdesc = eventdesc;
	this.eventk = eventk;
	this.eventB = eventB;
}
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Pinndit' });
});

router.post('/postpinn', function (req, res) {
	var eventname = req.body.name;
	var descname = req.body.desc;
	var k = req.body.k;
	var B = req.body.B;
	console.log('recieved post: ' + '(Name: ' + eventname + ') ' + '(Desc: ' + descname + ') ' + '(k: ' + k + ') ' + '(B: ' + B + ')');
	pinnData.push(new Pinn(eventname, descname, k, B));
	res.json({ status: 'OK'});
});

router.post('/postcomment', function (req, res) {
  var text = req.body.text;
  console.log('received post: ' + text);
  comments.push(new Comment(text));
  res.json({ status: 'OK'});
});

router.post('/check', function (req, res) {
  var last = parseInt(req.body.last, 10);
  var rest = comments.slice(last, comments.length);
  res.json(rest);
});

module.exports = router;
