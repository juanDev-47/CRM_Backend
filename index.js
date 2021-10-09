const express = require('express');
const routes = require('./routes');
// const mongoose = require('mongoose');
require('./config/db');
require('dotenv').config();

// CORS permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors');


// crear el servidor 
const app = express();

// leer objetos json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Habilitar CORS
app.use(cors());

// rutas de la app
app.use('/', routes());

// carpeta publica
app.use(express.static('uploads'));

// puerto
app.listen(process.env.PORT || 5000);