const smsService = require('../services/sms.service');


exports.newSms = (req, res, next) => {
    // Validar los datos ingresados.

    try{
        const newsms =  smsService.newSms(req, res, next);
        return  console.log(newsms);
        //res.status(200).json({ status: 200, data: newsms, message: "Succesfully SMS Enviado." });
    } catch(e){
        return console.log(e);
        // res.status(400).json({ status: 400, message: e.message });
    }
}

/*
exports.notification = (req, res, next) => {
    const messageSid = req.body.MessageSid;
    const messageStatus = req.body.MessageStatus;
  
    console.log(`SID: ${messageSid}, Status: ${messageStatus}`);
  
    res.sendStatus(200);
}
*/