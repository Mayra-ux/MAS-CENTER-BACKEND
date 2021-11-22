const {Schema, model} = require('mongoose');
const dash = require('../models/Dashb');


const DashDocSchema = Schema({
     type:{
         type: String,
         required:true
     },
    image:{
        type: String,
        required:true,
    },
    dashboard:{
        type: Schema.Types.ObjectId,
        ref:dash,
        unique:false
    }
});

DashDocSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports= model('DashDoc',DashDocSchema);