const {Schema, model} = require('mongoose');

const PaisSchema = Schema({
     name:{
         type: String,
         required:true
     },
    code:{
        type: String,
        required:true,
    },
    flag_url:{
        type: String,
        required:true,
    }
});

module.exports= model('Pais',PaisSchema);