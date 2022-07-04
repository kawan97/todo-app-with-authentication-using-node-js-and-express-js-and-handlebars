const express =require('express');
const app =express();
const mongoose =require('mongoose');
var exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport =require('passport');
const flash = require('connect-flash');
const session = require('express-session');



const User =require('./models/User');
//const upload = require('express-fileupload');
//app.use(upload());

//const path = require('path')
//app.use(express.static(path.join(__dirname, 'public')));


//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
const userRoute =require('./routes/user')
const postRoute = require('./routes/post')
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Method Override

app.use(methodOverride('_method'));
app.use(session({

    secret: 'dsadsadsadsagfdghgfhgf',
    resave: true,
    saveUninitialized: true

}));
app.use(passport.initialize());
app.use(passport.session());

// flash messages 
app.use(flash());
app.use((req,res,next) =>{
    res.locals.user = req.user || null;
    res.locals.error = req.flash('error');
    next();
    });

app.use('/user', userRoute)
app.use('/post', postRoute)


app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/user/login');
  });


app.listen(3000,() => console.log('lestning'));