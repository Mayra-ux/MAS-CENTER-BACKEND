const {Schema, model} = require('mongoose');
const usuario = require('../models/Usuarios');


const EHoursSchema = Schema({
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
    total:{
        type: Number
    },
    approval:{
        type: String
    },
    sup:{
        type: String
    },
});

EHoursSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports= model('CheckerExtra',EHoursSchema);