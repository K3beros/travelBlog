const bcrypt =require('bcrypt')

const User = require('../database/models/User')

const loginUser = (req, res) => {
    const  {email, password} = req.body;
    User.findOne({email}, (error, user)=>{
      //if user is found compare password
        if(user){
           const isPassCorrect = bcrypt.compareSync(password, user.password ) 
        
           //if password is correct store user session
           if(isPassCorrect){
            req.session.user = user;
            console.log(req.session.user);
            //redirects user to profile page
            return res.redirect('/profile');
           // console.log(user found)
        }
        //else redirects user to the login page
        else{
            return res.redirect('/login')
        }
      } else {
            console.log('no user')
            return res.redirect('/login');
        } 
        

       
    });
};


module.exports = loginUser;