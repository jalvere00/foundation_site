require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

console.log(process.env.GMAIL);
const transporter = nodemailer.createTransport({
	service:"GMAIL",
	auth:{
		user: process.env.GMAIL,
		pass: process.env.PASSWORD
	}
});

var app = express();

app.set('port', process.env.PORT||8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', express.static('public/'));
app.use('/js', express.static('public/js'));
app.use('/css', express.static('public/css'));
app.use('/img', express.static('public/img'));
app.use('/svg', express.static('public/svg'));
app.use('/foundation', express.static('public/foundation'));


app.get('*',function(req,res){
	res.sendFile(__dirname+'/public/index.html')
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