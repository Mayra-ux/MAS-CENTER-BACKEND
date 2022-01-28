//CODE ADDED BY MAYRA
const {Schema, model} = require('mongoose');

const BlogSpecialRulesSchema = Schema({
        date:{
            type: Date,
            required:true
    },
       
        image:{
            type: String,
            required:true,
    }
});

BlogSpecialRulesSchema .method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports= model('BlogSpecialRules',BlogSpecialRulesSchema );

