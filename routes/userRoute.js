const express = require('express');

const {User} = require('../models/user');

const userRouter = express.Router();

const controller = require('../controller/users');

userRouter.get('/',controller.home);

userRouter.get('/:userId',controller.home);


userRouter.post('/',controller.loginUser);

userRouter.get('/._id',controller.getUser);

module.exports = {
    userRouter,
}