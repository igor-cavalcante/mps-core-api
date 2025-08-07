const express = require('express');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const connectDB = require('../config/bd.js');
const UserSchema = require('../Models/UserSchema.js'); 


const hellou = async (req,res) => {
  res.status(200).json({message:"seja bem vindo a nossa api"});
};

const Login =  async (req,res)=> {
    try {
      console.log(req.body);
        const {email, password  } = req.body
    
        if (!email || !password) {
            return res.status(400).json({message: "Email ou Senha não informados", logged: false});

        }
        JWT
        await connectDB();
              
        const userFound = await UserSchema.findOne({
          email,    
        });

        if (!userFound) {
          return res.status(400).json({message: "Usuário não encontrado", logged: false});
        }

        const passwordsMatches = bcrypt.compare(password, userFound.password) ;

        if (!passwordsMatches) {
          return res.status(400).json({message: "As senhas não conferem", logged: false });

        }

        const token = JWT.sign({id: userFound._id},process.env.JWT_SECRET, {
          expiresIn: '1d'
        });

        return res.status(200).json({message: "Loggado com sucesso", logged: true, token})
    } catch (error) {      
      console.log(error);
        return res.status(500).json({message: "Erro ao realizar login", logged: false})
    }
};

const LoginGoogle = async (req,res)=> {
    res.send("hellou word");
};

const Register =  async (req,res) => {
  try {
    console.log(req.body);
      const {email, password} = req.body
  
      if (!email || !password) {
          return res.status(400).json({message: "Email ou Senha não informados", logged: false});

      }

      await connectDB();          
      
      const hashedPassword = await bcrypt.hash(password, 5);
      
      await UserSchema.create({
        email,
        password: hashedPassword
      })
      
      return res.status(200).json({message: "Conectado com o banco", logged: true})
  } catch (error) {      
    console.log(error);
      return res.status(500).json({message: "Erro ao realizar cadastro", logged: false})
  }
}; 



module.exports = {
  hellou,
  Login,
  LoginGoogle,
  Register
}