const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {dbConnection} = require('./database/config');


//crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//Cors
app.use(cors());

//Directorio public
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());
  
//Ruta de auth
app.use('/api/auth', require('./routes/auth'));
// CRUD de docs
app.use('/api/documentos', require('./routes/documentos'));
// CRUD de special rules
app.use('/api/specialrules', require('./routes/specialrules'));
// CRUD de paises
app.use('/api/paises', require('./routes/paises'));


app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});