const {Schema, model} = require('mongoose');

const SpecialRulesSchema = Schema({
     type:{
         type: String,
         required:true
     },
    image:{
        type: String,
        required:true,
    }
});

SpecialRulesSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports= model('SpecialRule',SpecialRulesSchema);