const express = require('express');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const passport = require('passport');
const path =    require('path');

const students = require('./routes/api/student/students');
const cv = require('./routes/api/student/cv');
const company = require('./routes/api/company/companies');
const portfolio = require('./routes/api/company/portfolio');
const posts = require('./routes/api/company/posts');
const admin = require('./routes/api/admin/admin');

// Initialize App
const app = express();

// Body parser middleWare
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



// DB Config
const db = require('./config/keys').mongoURI;

// Connect to mongoDB
mongoose
.connect(db,{ useNewUrlParser: true })
    .then(()=>{
        console.log('Connection to MongoDB :  Succesful');
    })
    .catch(err => console.log(err));


// Passport middleWare
app.use(passport.initialize());
// passport config
require('./config/passport')(passport);



// Use Routes
app.use('/api/student/students',students);
app.use('/api/student/cv',cv);
app.use('/api/company/companies',company);
app.use('/api/company/portfolio',portfolio);
app.use('/api/company/posts',posts);
app.use('/api/admin/admin',admin);




// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'))
    })
}





// test route
app.get('/',(req,res)=>{

    res.send('Hello World');
});

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server Running on port ${port}`);
});
