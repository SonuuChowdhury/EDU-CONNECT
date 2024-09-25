// app.js
import express from 'express';
import cors from 'cors';




// database connection
import connectDB from './src/db/index.js';

connectDB()

import router from './src/routes/routes.js';

const app = express();
app.use(cors());

app.use(cors({ origin: '*' }));
app.use(express.json());

// Routes for the server
app.use('/',router)


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
