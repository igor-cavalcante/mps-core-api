require('dotenv').config();
const express = require('express');

const cors = require('cors');
const authRoutes = require('./src/Routes/Auth.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRoutes);

port = 3000;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });