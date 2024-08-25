// app.js
import express from 'express';
import connectDB from './db/index.js';
const app = express();

// Connect the Database
connectDB()


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
