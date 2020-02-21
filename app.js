/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var bodyParser = require('body-parser')

var index = require('./routes/index');
var home = require('./routes/home');
var profile = require('./routes/profile');
var profile_records = require('./routes/profile_records');
var signup = require('./routes/signup');
var step1 = require('./routes/step1');
var step2 = require('./routes/step2');
var step3 = require('./routes/step3');
var forget_your_password = require('./routes/forget_your_password');
var finish = require('./routes/finish');
var add = require('./routes/add');

var step1_data = require("./step1.json");
var step2_data = require("./step2.json");

// var signup_step2 = require("./signup_step2");

//var project = require('./routes/project');

// Example route
// var user = require('./routes/user');

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
app.get('/home', home.view);
app.get('/profile', profile.viewProject);
app.get('/profile_records', profile_records.viewProject);
app.get('/step1', step1.viewProject);
app.get('/step2', step2.viewProject);
app.get('/step3', step3.viewProject);
app.get('/signup', signup.viewProject);
app.get('/forget_your_password', forget_your_password.viewProject);
app.get('/finish', finish.viewProject);

app.post('/signup_step1', (req, res) => {
  // let { formData } = req.form;
  let {
    username,
    pass,
    cpass,
    email,
    twitter
  } = req.body
  let obj = {
    'username': username,
    'pass': pass,
    'cpass': cpass,
    'email': email,
    'twitter': twitter
  }

  step1_data.step1[username] = obj
  console.log(step1_data)
  res.send(step1_data)
});
app.post('/signup_step2', (req, res) => {
  // let { formData } = req.form;
  let {
    imageId,
    eatBuddy,
    name
  } = req.body
  let obj = {
    'imageId': imageId,
    'eatBuddy': eatBuddy
  }

  step2_data.step2[name] = obj
  console.log(step2_data)
  //
  // step1_data.step1[username] = obj
  // console.log(step1_data)
  res.send(step2_data)
});

// app.get('/signup_step2', (req, res) =>{
//   let obj = step2_data.step2[name]
//   let { step2 } = res;
//   imageSrc = mapImgSrc[step2[name]['imageId']]
//   console.log(imageSrc)
//   $('#user-avatar').attr('src', imageSrc)
//   $('#eatBuddy').html(eatBuddy)
// });




app.get('/add', add.addRecord);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});