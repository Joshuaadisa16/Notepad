const express = require('express')

const {User} = require('../models/user')

const flash = require('connect-flash')

const bcrypt = require('bcrypt')

const {generateHashed} = require('../middlewares/auth')

const {validatePassword} = require('../middlewares/auth')

const home =  async(req,res)=>{
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.render('home',{user})
}

const loginUser = async (req,res)=>{
    try {
        const body = req.body
        const user = new User(body);
        const emailExists = await User.findOne({email : user.email});
        
        if(!emailExists){ 
            if(!body.firstName || !body.lastName || !body.email || !body.password){
                // res.flash('error','Please fill the form ')
              return  res.status(400).redirect('/');  
            }
            user.password = generateHashed(body.password); 
            user.email = body.email.toLowerCase()
            result = await user.save();
            return  res.status(302).redirect('/');
            
        }

        
        if(!body.email || !body.password){
            return res.status(400).redirect('/')
        }
        const valid = validatePassword(body.password,emailExists.password)

        // const user = await User.findById(req.user._id)
        if(!valid){
            console.log('pword not match');
            return res.status(400).redirect('/')
            
        }else{
           console.log('match');
           return res.status(200).redirect(`/${emailExists._id}`)
          
        }
      
        
      
     
       
       
    } catch (error) {
        console.log(error);
        
    }

}

const getUser = async (req,res)=>{
   
}

module.exports = {
    home,
    loginUser,
    getUser,
}