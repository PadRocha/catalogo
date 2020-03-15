'use strict'

const express = require('express'); //* Calls express
const morgan = require('morgan'); //* Calls morgan
const cors = require('cors'); //* Calls cors
const path = require('path'); //* Calls path
const multer = require('multer'); //* Calls multer
const { v4: uuidv4 } = require('uuid'); //* Calls uuid > v4 to random

const app = express();

/*------------------------------------------------------------------*/
// Settings
/*------------------------------------------------------------------*/

app.set('port', process.env.PORT || 4000);  //* Definir el puerto
const storage = multer.diskStorage({ //* Definir donde se van a guardar las imagenes y se les asigna un nombre al azar
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
    }
});

/*------------------------------------------------------------------*/
// Middlewares
/*------------------------------------------------------------------*/

app.use(morgan('dev'));     //* Escuchar las peticiones HTTP
app.use(cors());            //* Permitir enviar datos entre frontend & backend
app.use(express.json());    //* Permite el uso de Json
app.use(multer({
    storage,
    dest: path.join(__dirname, 'uploads'),
    fileFilter: function (req, file, cb) {
        var filetypes = /jpeg|jpg|png|gif/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: File upload only supports the following filetypes - " + filetypes);
    },
    limits: { fileSize: 500000 },
}).single('image'));

/*------------------------------------------------------------------*/
// Routes
/*------------------------------------------------------------------*/

app.use('/api', require('./routes/api.routes'));

/*------------------------------------------------------------------*/

module.exports = app;