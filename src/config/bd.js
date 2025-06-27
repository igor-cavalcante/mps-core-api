const mongoose = require('mongoose');

const uri = "mongodb+srv://MPS:mpsadmin@mps.r9191kd.mongodb.net/MPS?retryWrites=true&w=majority&appName=MPS";

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🟢 Conectado ao MongoDB com sucesso!");
  } catch (error) {
    console.error("🔴 Erro ao conectar ao MongoDB:", error.message);
    process.exit(1); // Encerra o processo se falhar
  }
}

module.exports = connectDB;
