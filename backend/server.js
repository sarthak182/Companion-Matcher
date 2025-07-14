// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const usersRouter = require('./submituser'); // path to your combined file

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.use('/users', usersRouter);

// mongoose.connect('mongodb://127.0.0.1:27017/comp-match', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log('MongoDB connected ✅');
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// })
// .catch(err => {
//   console.error('MongoDB connection failed ❌:', err.message);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./submituser'); // ✅ Make sure this has schema + all routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', usersRouter); // e.g., /users, /users/candidates/:email

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/comp-match', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
});
