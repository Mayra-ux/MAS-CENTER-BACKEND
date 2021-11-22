const {Schema, model} = require('mongoose');
const custom = require('../models/CustomW');


const CustomDocSchema = Schema({
     type:{
         type: String,
         required:true
     },
    image:{
        type: String,
        required:true,
    },
    typeCustom:{
        type: Schema.Types.ObjectId,
        ref:custom,
        unique:false
    }
});

CustomDocSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports= model('CustomDoc',CustomDocSchema);