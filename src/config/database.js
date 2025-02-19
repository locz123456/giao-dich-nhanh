const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_URI;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function CONNECT_DB() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    const dataName = await mongoose.connection.db.databaseName
    console.log(`Pinged your deployment. You successfully connected to MongoDB(${dataName})!`);
  } finally {
    // Ensures that the client will close when you finish/error
  }
} 
 
module.exports = {
    CONNECT_DB
}