require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');

const route  = require('./api/routes');
const { globalErrorHandler } = require('./api/utils/error');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(route);
app.use(globalErrorHandler);

app.get('/ping', (req, res) => {
    res.status(200).json({ message : 'pong'}); 
})

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        app.listen(PORT, () => 
        console.log(`server is listening on ${PORT}`))
    } catch (err) {
        console.log(err);
    }
}

startServer();