const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const dishes = require('./routes/dishes');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT;

//Start express app
const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Create a database connection
connectDB();
app.use('/chefonline/v1/dishes', dishes);

const server = app.listen(
    PORT,
    console.log(
        `Server running on ${process.env.NODE_ENV} mode, port: ${PORT} `
    )
);

//Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close server
    server.close(() => process.exit(1));
});
