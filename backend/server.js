// backend/server.js

// const express = require('express');
// const path = require('path');
// const connectDB = require('./config/db');
// const userRoutes = require('./routes/userRoutes');
// const securityMiddleware = require('./middleware/security');

// const app = express();

// // Connect Database
// connectDB();

// // Apply security middleware
// app.use(securityMiddleware);

// // Init Middleware
// app.use(express.json({ extended: false }));

// // Routes
// app.use('/api/users', userRoutes);

// // Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
  
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/campaignQA_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => console.error('MongoDB connection error:', err));
