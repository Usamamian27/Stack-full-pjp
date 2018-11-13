const express = require('express');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const passport = require('passport');

const s_user = require('./routes/api/student/s-user');
const s_profile = require('./routes/api/student/s-profile');

const c_user = require('./routes/api/company/c-user');
//const c_profile = require('./routes/api/company/c-profile');

// Initialize App
const app = express();

// Body parser middleWare
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



// DB Config
const db = require('./Config/keys').mongoURI;

// Connect to mongoDB
mongoose
.connect(db)
    .then(()=>{
        console.log('Connection to MongoDB :  Succesful');
    })
    .catch(err => console.log(err));


// Passport middleWare
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);



// Use Routes
app.use('/api/student/s-user',s_user);
app.use('/api/student/s-profile',s_profile);
app.use('/api/company/c-user',c_user);
//app.use('/api/company/c-profile',c_profile);



// test route
app.get('/',(req,res)=>{

    res.send('Hello World');
});

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server Running on port ${port}`);
});
