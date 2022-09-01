const express = require('express')

const mongoose = require('mongoose')

const path = require('path')

const {userRouter } = require('./routes/userRoute')

const flash = require('connect-flash')

const {newSession} = require('./middlewares/session')

const {User} = require('./models/user')

const bodyParser = require("body-parser");

const dotenv = require('dotenv').config();

const app = express()

const PORT = process.env.PORT || 5500;

app.set('view engine','ejs')

// app.set('views', path.join(__dirname, 'views'));

app.use(express.static("./public"));

// app.use(express.static(path.join(__dirname, 'public')));

// app.use(bodyParser.urlencoded({extended: false}));


app.use(express.urlencoded({extended: true}));



app.use(bodyParser.json());
// app.use((req, res, next) => {
//     res.locals.userEmail = "user";
//     next();
// });


  

DBURI = process.env.MONGO_URI;
mongoose.connect(DBURI,{useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{
    app.listen(PORT,()=>{
        console.log(`Connected to server on ${PORT}`);
    })

}).catch((error)=> console.log(error))

app.use('/',userRouter);

