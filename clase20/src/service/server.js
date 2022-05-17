const express = require('express');
const mainRouter = require('../routes/index');
const http = require('http');

const app = express();

app.use(express.json());

app.use('/api', mainRouter);

app.use((err, req, res, next) => {
    return res.status('500').json({
        msg: 'Hubo un error inesperado',
        error: err.message
    });
});

const httpServer = http.Server(app);

module.exports = httpServer;