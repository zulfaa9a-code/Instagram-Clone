const express= require('express');

const identifyUser = require('../middlewares/auth.middleware');
const authController= require('../controllers/auth.controllers')
const authRouter=express.Router()
authRouter.post('/register', authController.registerController)
authRouter.post('/login', authController.loginController)
authRouter.get(
    '/me',
    identifyUser,
    authController.getMeController
);
authRouter.get('/test', (req, res) => {
    res.send('AUTH ROUTER WORKING');
});
module.exports=authRouter;