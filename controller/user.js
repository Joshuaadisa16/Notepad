const express = require('express')

const {User} = require('../models/user')

const flash = require('connect-flash')

const bycrypt = require('bcrypt')

const {generateHashed} = require('../middlewares/auth')

const {validatePassword} = require('../middlewares/auth')

const home = (req,res)=>{
    res.render('home')
}
const registerUser = async(req,res)=>{
    try {
        const body = req.body
        const user = new User(body);
        
        if(!body.firstName || !body.lastName || !body.email || !body.password){
            // res.flash('error','Please fill the form ')
          return  res.status(400).redirect('/');  
        }
        user.password = generateHashed(body.password);
        user.email = body.email.toLowerCase()
        const emailExists = await User.findOne({email : body.email});
        
        if(emailExists){ 
            return res.status(400).redirect('/'); 
        }
        result = await user.save();
       return  res.status(302).redirect('/');
        // req.flash('success','You can Sign In now')
        
    } catch (error) {
        console.log(error);
        return res.status(500).redirect('/')
        
    }

};
const loginUser = async (req,res)=>{
    try {
        const body = req.body;

        // const user = await User.findById(req.params._id)

        if (!body.email || !body.password) {
            // req.flash('error','Provide your Email and Password')
        return    res.status(400).redirect('/')
        }
        const userEmail = await User.findOne({email : body.email.toLowerCase()});

        if(userEmail === body.email){
            console.log('Email already exist');
        }
        const valid = validatePassword(body.password,userEmail.password)
        // const user = await User.findById(req.user._id)
        if(!valid){
            console.log('pword not match');
            return res.status(400).redirect(`/`);
        }else{
            console.log('match');
            res.status(200).redirect('/')
            
        }

            
    } catch (error) {
        console.log(error);
        return res.status(500).redirect('/')
        
    }
    try {
        const body = req.body;

        // const user = await User.findById(req.params._id)

        if (!body.email || !body.password) {
            // req.flash('error','Provide your Email and Password')
        return  res.status(400).redirect('/')
        }
        const userEmail = await User.findOne({email : body.email.toLowerCase()});

        if(!userEmail){
            console.log('Email and pword not exist');
        }

        const valid = validatePassword(body.password,userEmail.password)
        // const user = await User.findById(req.user._id)
        if(!valid){
            console.log('pword not match');
            
        }else{
           console.log('match');
            // res.status(200).redirect('/')
            
        }

            
    } catch (error) {
        console.log(error);
        return res.status(500).redirect('/')
        
    }

}

const getUser = async (req,res)=>{
    res.render('home')
}

module.exports = {
    home,
    registerUser,
    loginUser,
    getUser,
}


const inUser = User.findOne({email: body.email.toLowerCase()})
if(!inUser){
    if(!body.firstName || !body.lastName || !body.email || !body.password){
        // res.flash('error','Please fill the form ')
      return  res.status(400).redirect('/');  
    }
    console.log(body.password);
    // User.password = generateHashed(body.password);
    
    result = await User.save();
    return res.redirect('/')
    
}
if(!body.email || !body.password){
    return res.status(400).redirect('/')
}
const valid = validatePassword(body.password,User.password)
// const user = await User.findById(req.user._id)
if(!valid){
    console.log('pword not match');
    
}else{
   console.log('match');
   return res.status(200).redirect('/id')
  
}