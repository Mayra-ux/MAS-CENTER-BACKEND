const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
     name:{
         type:String,
         required:true
     },
     email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    shift:{
        type:String,
        required:true,
    },
    hub:{
        type:String,
        required:true,
    },
    breakT:{
        type:String,
        required:true,
    },
});
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});
module.exports= model('Usuario',UsuarioSchema);