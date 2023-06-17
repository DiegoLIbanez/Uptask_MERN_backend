import mongoose from 'mongoose';

const conectarDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    const url = `${conn.connection.host}:${conn.connection.port}`
    console.log(`Conectado MongoDB a: ${url}`)
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default conectarDB;
