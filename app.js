const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser'); // Importa body-parser

const app = express();

//coneccion DB
/* require("./src/DB/db"); */

//Configuraciones
app.set('PORT', process.env.PORT || 3300);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'src/views'));
app.use(express.static('public'));
app.use(morgan('dev'));

// Configuración de middleware
app.use(bodyParser.urlencoded({ extended: true })); // Analiza datos de formularios codificados en URL
app.use(bodyParser.json()); // Analiza datos de tipo JSON

//rutas
app.use('/', require("./src/router/router"));

//Iniciamos servidor
app.listen(app.get('PORT'), ()=>{
    console.log("Server on PORT 3300")
});
