// app.js
import express from 'express';
import cors from 'cors';

// database connection
import connectDB from './src/db/index.js';
connectDB()

const app = express();
app.use(cors());
app.use(cors({ origin: '*' }));
app.use(express.json());

// Routes for the server
import router from './src/routes/routes.js';
app.use('/',router)


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVER IS LIVE IN THE PORT 3000 AND PRODUCTION📢!`);
});
