const smsSchema = require('../models/sms.model');
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

let bloqueado = false;

exports.newSms = function (req, res, next) {


    const desbloquear = () => {
        const desbloq = () => {
        bloqueado = false;
        console.log('servicio sms desbloqueado')
        }
        setInterval(desbloq, 300000);
    }


    // ENVÍA EL MENSAJE DE TEXTO 
    if(!bloqueado){

    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefonoEmisor = req.body.telefonoEmisor;
    let textoMensaje = req.body.textoMensaje;
    textoMensaje = textoMensaje + `   --MENSAJE DE: ${nombre} ${apellido}. Num: ${telefonoEmisor}`;

    // const telefonoDestino = req.body.telefonoDestino;

     // CONFIGURACION DE TWILIO PARA ENVÍO DE SMS.
    client.messages
    .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.FUNGI_TEL, //+telefonoDestino,
        // statusCallback: 'https://un-link-de-internet-donde-llegue-el-callback-de-sms-enviado-No-Localhost.com',
        body: textoMensaje
    })
    .then(() => {
        //return res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
        console.log(err);
        //return  res.send(JSON.stringify({ success: false }));
    });

    // GUARDA EL MENSAJE ENVIADO EN LA BASE DE DATOS
    const sms = new smsSchema(req.body);
    sms
        .save()
        .then((data) => res.JSON(data))
        .catch((error) => res.json({ message: error }));


        bloqueado = true ;
        console.log('servicio sms bloqueado')
        desbloquear();

    } else {
        console.log('Aguarde 5 minutos para enviar otro mensaje, anda corto de plata el fungi, y en primer lugar este proyecto es de muestra jeje saludos.');
    }
};

