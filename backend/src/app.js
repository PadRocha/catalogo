'use strict'

const express = require('express'); //* Calls express
const morgan = require('morgan'); //* Calls morgan
const cors = require('cors'); //* Calls cors

const app = express();

/*------------------------------------------------------------------*/
// Settings
/*------------------------------------------------------------------*/

app.set('port', process.env.PORT || 4200);  //* Definir el puerto

/*------------------------------------------------------------------*/
// Middlewares
/*------------------------------------------------------------------*/

app.use(morgan('dev'));     //* Escuchar las peticiones HTTP
// app.use(cors());            //* Permitir enviar datos entre frontend & backend
app.use(express.json());    //* Permite el uso de Json

/*------------------------------------------------------------------*/
// Routes
/*------------------------------------------------------------------*/

// app.use('/api', require('./routes/api.routes'));

/*------------------------------------------------------------------*/

module.exports = app;