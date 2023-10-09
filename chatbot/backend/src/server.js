const {inject, errorHandler} = require('express-custom-error');
inject();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');


const logger = require('./util/logger');

require('mandatoryenv').load(['DB_URL','PORT','SECRET']);

const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger.dev, logger.combined);
app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.use('*', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})

app.use('/api', require('./routes/router.js'));
app.use(errorHandler());
app.use('*', (req, res) => {res.status(404).json( {status: false, message: 'Endpoint Not Found'} )})

app.listen(PORT,() => console.info('Server listening on port ', PORT));