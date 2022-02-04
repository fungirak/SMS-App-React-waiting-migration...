const  mongoose = require('mongoose');

require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

module.exports = () => {
    const connect = () => {
        mongoose.connect(MONGO_URI, 
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true
            },
            (err) => {
                if(err){
                    console.log('DB: ERROR.')
                } else {
                    console.log('Conectado a MongoDB ATLAS.')
                }
            }
        )
    }

    connect();
}