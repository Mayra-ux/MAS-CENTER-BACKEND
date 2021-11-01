const {Schema, model} = require('mongoose');
const pais = require('../models/Paises');


const DocumentoSchema = Schema({
     type:{
         type: String,
         required:true
     },
    image:{
        type: String,
        required:true,
    },
    country:{
        type: Schema.Types.ObjectId,
        ref:pais,
        unique:false
    }
});

DocumentoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports= model('Documento',DocumentoSchema);