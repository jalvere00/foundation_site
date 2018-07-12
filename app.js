require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const skills = [
	{
		category:"Programming Languages",
		entries:[
			{
				name:"C++",
				rate:2
			},
			{
				name:"Java",
				rate:4
			},
			{
				name:"Python",
				rate:5
			},
			
			{
				name:"JavaScript",
				rate:5
			}
		] 
	},
	{
		category:"Databases",
		entries:[
			{
				name:"Oracle",
				rate:4
			},
			{
				name:"MongoSQL",
				rate:4
			},
			{
				name:"PostgreSQL",
				rate:4
			}
		] 
	},
	{
		category:"JavaScript Libraries",
		entries:[
			{
				name:"jQuery",
				rate:4
			},
			{
				name:"React (Babel)",
				rate:5
			}
		] 
	},
	{
		category:"Frontend Frameworks",
		entries:[
			{
				name:"Material-UI",
				rate:4
			},
			{
				name:"Bootstrap",
				rate:4
			}
		] 
	},
	{
		category:"Server Frameworks",
		entries:[
			{
				name:"Django",
				rate:4
			},
			{
				name:"Nodejs",
				rate:4
			}
		] 
	},
	{
		category:"Version Control",
		entries:[
			{
				name:"Git",
				rate:4
			}
		] 
	}
]

console.log(process.env.GMAIL);

const transporter = nodemailer.createTransport({
	service:"GMAIL",
	auth:{
		user: process.env.GMAIL,
		pass: process.env.PASSWORD
	}
});

var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.set('port', process.env.PORT||8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', express.static('public/'));
app.use('/js', express.static('public/js'));
app.use('/css', express.static('public/css'));
app.use('/img', express.static('public/img'));
app.use('/svg', express.static('public/svg'));
app.use('/foundation', express.static('public/foundation'));


app.get('/',function(req,res){
	res.render('index', {skills:skills})
})


app.post('/message', (req,res)=>{
	let name = req.body.contact_name;
	let email = req.body.contact_email;

	let message = req.body.email_message;

	let mailOptions = {
		from: `"${name}" <${email}>`,
		to: "darkage400@gmail.com",
		subject: `Message from Node.js ${email}`,
		text:message
	};

	transporter.sendMail(mailOptions, (error, info)=>{
		if(error){
			return console.log(error);
			res.json({response:"Errors"})
		}
		console.log('Message sent: %s', info.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		res.redirect('/');
	})

})


var server = app.listen(app.get('port'), function(){
	console.log("app started on port "+app.get('port'));
});