const express = require('express');
const accountController = require('../controllers/accountController');
const accountRoutes = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const authMiddleware = require('../middlewares/authMiddleware');

accountRoutes.post('/register' , jsonParser,                 accountController.register);
accountRoutes.post('/login'    , jsonParser,                 accountController.login   );
accountRoutes .get('/auth'     , jsonParser, authMiddleware, accountController.auth    );
accountRoutes .get('/logout'   , jsonParser,                 accountController.logout  );
//accountRoutes.get('/', accountController.home);

module.exports = accountRoutes;