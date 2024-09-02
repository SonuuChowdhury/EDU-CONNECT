// app.js
import express from 'express';
import connectDB from './src/db/index.js';
import { setDB_NAME } from './constants.js';
const app = express();

// Connect the Database
connectDB()



// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
