const express = require('express');
const routes = require('./routes');
// const mongoose = require('mongoose');
require('./config/db');
require('dotenv').config({path: 'variables.env'});

// CORS permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');


// crear el servidor 
const app = express();

// leer objetos json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// definir un dominio para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOption = {
    origin: (origin, callback) => {
        // console.log(origin);
        // revisar si la peticion viene de un servidor en whitelist
        const existe = whitelist.some(dominio => dominio === origin);
        if(existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

// Habilitar CORS
app.use(cors(corsOption));

// rutas de la app
app.use('/', routes());

// carpeta publica
app.use(express.static('uploads'));

// puerto
app.listen(process.env.PORT || 5000);