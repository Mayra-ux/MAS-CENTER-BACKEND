const {Schema, model} = require('mongoose');

const DashbSchema = Schema({
     name:{
         type: String,
         required:true
     },
     image:{
        type: String
    },
});

module.exports= model('Dashb',DashbSchema);