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
// CRUD de erizo add Mayra
app.use('/api/erizo', require('./routes/erizo'));
// CRUD de BlogCards add Mayra
app.use('/api/blogCards', require('./routes/blogCards'));
// CRUD de BlogCarousel add Mayra
app.use('/api/blogCarousel', require('./routes/blogCarousel'));
// CRUD de BlogSpecialRules add Mayra
app.use('/api/blogSpecialRules', require('./routes/blogSpecialRules'));
// CRUD de BlogMemes add Mayra
app.use('/api/blogMemes', require('./routes/blogMemes'));
// CRUD de BlogReglasObsoletas add Mayra
app.use('/api/blogObsoleteRules', require('./routes/blogObsoleteRules'));
// CRUD de special rules
app.use('/api/specialrules', require('./routes/specialrules'));
// CRUD de paises
app.use('/api/paises', require('./routes/paises'));
//Ruta de custom
app.use('/api/custom', require('./routes/custom'));
//Ruta de dash
app.use('/api/dashb', require('./routes/dashb'));
//Ruta de custom docs
app.use('/api/customDocs', require('./routes/customDocs'));
//Ruta de dash docs
app.use('/api/dashDocs', require('./routes/dashDocs'));
//Ruta de check
app.use('/api/check', require('./routes/check'));
//Ruta de horas extras
app.use('/api/checkE', require('./routes/checkE'));
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});