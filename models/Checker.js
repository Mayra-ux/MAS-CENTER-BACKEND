const {Schema, model} = require('mongoose');
const usuario = require('../models/Usuarios');


const CheckerSchema = Schema({
    uid:{
        type: Schema.Types.ObjectId,
        ref:usuario,
        unique:false
    },
    fecha:{
        type: String,
    },
    checkin:{
        type: String,
    },
    checkout:{
        type: String,
    },
    breakC:{
        type: String,
    },
    returnC:{
        type: String,
    },
    totalB:{
        type: Number
    },
    total:{
        type: Number
    }
});

CheckerSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports= model('Checker',CheckerSchema);