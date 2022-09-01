const express = require('express');

const {User} = require('../models/user');

const noteRouter = express.Router();

const controller = require('../controller/notes');


noteRouter.post('/',controller.userNote);


module.exports = {
    noteRouter,
}