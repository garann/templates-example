


/**
 * Module dependencies.
 */

var express = require('express');
var fs = require('fs');

// Path to our public directory

var pub = __dirname + '/public';

// serve with connect's staticProvider

var app = express.createServer(
    express.staticProvider(pub)
);

// Optional since express defaults to CWD/views

app.set('views', __dirname + '/views');

// Set our default template engine to "jQuery templates"?
app.set( "view engine", "html" );
app.register( ".html", require( "./lib/jqtpl" ) );

// Dummy users
var bands = {foo:"bar",data:[
	{bandName:"Banana Wolf",members:[
			{name:"Stevie",instrument:"Vocoder"},
			{name:"Brad",instrument:"Theremin"}
		],single:{title:"In Your Earballs",url:"earballs.mp3"},
		photo:"bwolf.png"},
	{bandName:"Glittercobra Kissfight",members:[
			{name:"Sequin Cherie",instrument:"Vocals"},
			{name:"Cupcake Glorious",instrument:"Keyboard"},
			{name:"Phil Ament",instrument:"Guitar"}
		],single:{title:"Pink Balloons",url:"balloons.mp3"},
		photo:"pickled.png"},
	{bandName:"Goathook",members:[
			{name:"John Souvenir",instrument:"Vocals"},
			{name:"Chester Flamingo",instrument:"Bass"},
			{name:"Franklin Washbasin",instrument:"Guitar"},
			{name:"Norm Spoon",instrument:"Drums"},
			{name:"Marge 'Courtney' Jones",instrument:"Tambourine"}
		],single:{title:"Your Mom",url:"yrmom.mp3"},
		photo:"cdr.png"}	
]};

fs.readFile('./public/templates/band-tmpl.js','utf8',function (err,text) {
  if (err) throw err;
  global.bandTmpl = text;
});

app.get('/', function(req, res){
    res.render('bands', bands);
});

// Dummy comments
var bwolf = {comments:[
	{commentor:"Hank",text:"Banana Wolf is my favorite ever. RAWK.",timestamp:new Date(2010,8,3)},
	{commentor:"Lola",text:"You guys are the most awesomest!!!1",timestamp:new Date(2010,8,24)},
	{commentor:"hi5guyz",text:"COME TO TEMPE",timestamp:new Date(2010,9,1)},
	{commentor:"Ruby",text:"I just wanted you guys to know that you totally inspired me to play the theremin cause it is like the coolest instrument ever. I will be in high school next year and then I'm going to start a band just like you! &hearts; &hearts; &hearts;",timestamp:new Date(2010,9,17)}
]};

fs.readFile('./public/templates/comment-tmpl.js','utf8',function (err,text) {
  if (err) throw err;
  global.commentTmpl = text;
});

app.get('/banana-wolf', function(req, res){
    res.render('banana-wolf', bwolf);
});

app.listen(3000);