const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

require('./config/database');
const express = require('express');

// Auth
const verifyToken = require('./middleware/verify-token');

// Controllers
const testJWTRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/users');
const profilesRouter = require('./controllers/profiles');
const tasksRouter = require('./controllers/tasks')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/test-jwt', testJWTRouter); // REMOVE FOR TEST ONLY
app.use('/users', usersRouter);

// Protected Routes
app.use(verifyToken)
app.use('/profiles', profilesRouter);
app.use('/tasks', tasksRouter)
app.listen(PORT, () => {
  console.log('The express app is ready!');
});
