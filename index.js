require('dotenv').config()
const express =require('express');
const path = require('path');
const ejs = require('ejs');
const passport = require('passport')
const bodyParser = require('body-parser')
const session = require('express-session')
// const cookieSession = require('cookie-session');
const flash = require('express-flash')
const app = express();

// *******************    Set Template Engine  ***********************************//

app.set("view engine","ejs")
app.set('views', path.join(__dirname, 'views'))
console.log(app.get("view engine"))


// ************************  Database Connection  **********************************//
const {connectMonggose} = require('./app/database/db')
connectMonggose();

// ***************************************  Google  Authentication Connection  ********************************//


// require('./app/passport/passportGoogle');
// app.use(cookieSession({
// 	name: 'google-auth-session',
// 	keys: ['key1', 'key2']
// }));
// app.use(passport.initialize());
// app.use(passport.session());

//*****************************  Session config   ************************************//
app.use(session({
    secret:  process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hour
}))


// *********************************   Google Authenticate   *****************************//
// Auth 
// app.get('/auth' , passport.authenticate('google', { scope:
//     [ 'email', 'profile' ]
// }));
  
// Auth Callback
// app.get( '/auth/callback',
//     passport.authenticate( 'google', {
//         successRedirect: '/auth/callback/success',
//         failureRedirect: '/auth/callback/failure'
// }));
  
//Success
// app.get('/auth/callback/success' , (req , res) => {
//     if(!req.user)
//         res.redirect('/auth/callback/failure');
//     res.send("Welcome " + req.user.email);
// });
  
// Failure
// app.get('/auth/callback/failure' , (req , res) => {
//     res.send("Error");
// })
// mongodb+srv://ajayprajapati:<password>@auth-project.4s9hnhm.mongodb.net/?retryWrites=true&w=majority

// *********************   Passport Config   ***********************************//
const passportInit = require('./app/passport/passport')
passportInit(passport)
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())


// *************************    Assets    ****************************************//
const publicPath = path.join(__dirname,"public");
app.use(express.static(publicPath));
app.use(express.static(__dirname + '/public'));
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// ***********************************Routes ********************************//
require('./routes/web')(app)

// ************************   Port Start   ********************************//
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`My server start on this port ${PORT}`)
})


