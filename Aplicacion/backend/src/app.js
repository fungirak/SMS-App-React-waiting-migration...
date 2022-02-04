const express = require('express');
const app = express();
require('dotenv').config();
const router = express.Router();
const pino = require('express-pino-logger')();
const initDB = require('./db');

router.use(pino);


//Require Routes
const smsRoutes = require('./routes/sms.route');

const port = process.env.PORT || 4001;

// Evitar problemas de red y ver las solicitudes http en consola.
const cors = require('cors');
//const morgan = require('morgan');

app.listen(port, () => {
    console.log('server listening on port', port);
});

/*-------------------------APP---------------------------------*/
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
//app.use(morgan('dev'));

app.use( smsRoutes );

// Inicia Conexión a la base de datos MONGO DB ATLAS.
initDB();

/* GET home page. */
app.get('/', function(req, res, next) {
    res.json({ server: 'Express'});
  });

module.exports = app;