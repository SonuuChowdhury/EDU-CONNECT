// app.js
import express from 'express';
import cors from 'cors';


// database connection
import connectDB from './src/db/ConnectMongoDB.js';
import { connectRedis } from './src/db/ConnectRedis.js';

import HitServer from './src/api/Checking Servers/HitServer.js';

connectDB()
connectRedis()

const app = express();
app.use(cors());
app.use(cors({
  origin: '*', 
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));
app.use(express.json());

// Routes for the server
import router from './src/routes/routes.js';
app.use('/',router)

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SERVER IS LIVE IN THE PORT 3000 AND PRODUCTION📢!`);
});

setTimeout(() => {
  HitServer();
}, 30000);

