const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

// Route files
const symbols = require('./routes/symbols');
const recomendations = require('./routes/recomendations');
const buys = require('./routes/buys');
const history = require('./routes/history');
const portfolios = require('./routes/portfolios');
const auth = require('./routes/auth');
const subscriptions = require('./routes/subscriptions');

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV == 'development ') {
  app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10000
});

app.use(limiter);

// Prevent Http Param Polution
app.use(hpp());

// Enale CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes

app.use('/api/v1/symbols', symbols);
app.use('/api/v1/recomendations', recomendations);
app.use('/api/v1/buys', buys);
app.use('/api/v1/history', history);
app.use('/api/v1/portfolios', portfolios);
app.use('/api/v1/auth', auth);
app.use('/api/v1/subscriptions', subscriptions);

// Handle erros
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV}mode on port ${PORT}`.yellow.bold
  );
});

// Handle unhandle promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});
