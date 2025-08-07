const express = require('express');
const router = express.Router(); 
const AuthController = require('../Controller/AuthController');


router.get("/", AuthController.hellou);
router.post('/login', AuthController.Login);
router.get('/login/google', AuthController.LoginGoogle);
router.post('/register', AuthController.Register); 

module.exports = router;
