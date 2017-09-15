var express = require('express')
var bodyParser = require('body-parser');
var path = require('path');
var Lob = require('lob')('test_37d8933415906d60720ae08018b49f6e758')


var port = process.env.PORT || 3001

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, '/client/public')))

app.post('/lob', function(req, res) {
	console.log('in lob', req.body)
	Lob.letters.create(req.body)
	.then(data=> {
		return res.send(data)
	})
})

app.listen(port, () => {
  console.log('App is listening to port ' + port);
})

module.exports = app;