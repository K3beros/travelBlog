//const expressEdge = require('express-edge')
const User =  require("../database/models/User")
const bcrypt = require('bcrypt')


const registerUser =(req, res)=>{
     
    //save the user details gotten from the request.body object
    const { name, email, username, password, location, dateOfBirth, gender } = req.body;
    console.log(req.body)
    const hashedPassword = bcrypt.hashSync(password, 10)
    
    User.create({name, email, username, password: hashedPassword, location, dateOfBirth, gender}, (err, user)=> {
        console.log('gender is', typeof gender);
         res.redirect('/login')
    });

};

module.exports = registerUser;