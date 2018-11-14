const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Student = mongoose.model('students');
const Company = mongoose.model('companies');
const keys = require('../Config/keys');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;


module.exports = (passport)=> {

    console.log('usama');
    passport.use('Student',new JwtStrategy(opts,(jwt_payload , done )=>{
        Student.findById(jwt_payload.id)
            .then(user=>{
                if(user){
                    return done(null,user);
                }
                return done(null,false);
            })
            .catch(err => console.log(err)); 
    }));

    passport.use('Company',new JwtStrategy(opts,(jwt_payload , done )=>{
        console.log('Speaking from Company Stratergy');
        Company.findById(jwt_payload.id)
            .then(user=>{
                if(user){
                    return done(null,user);
                }
                return done(null,false);
            })
            .catch(err => console.log(err));
    }));
};