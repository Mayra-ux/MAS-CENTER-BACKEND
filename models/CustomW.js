const {Schema, model} = require('mongoose');

const CustomSchema = Schema({
     name:{
         type: String,
         required:true
     },
     image:{
        type: String
    },
});

module.exports= model('Custom',CustomSchema);