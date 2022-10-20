const express = require('express');
const pageController = require('../controllers/pageController');
const pageProtectMiddleware = require('../middlewares/pageProtectMiddleware');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const pageRouter = express.Router();

pageRouter.post('/pageSetup', jsonParser,                        pageController.page_POST );
pageRouter.get ('/:pageId'  ,                                    pageController.page_GET  );

module.exports = pageRouter;
