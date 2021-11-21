import express = require('express');
import HomeController from './home.controller';

export const homeRouter = express.Router();

// GET home
homeRouter.get('/', HomeController.getHome);
