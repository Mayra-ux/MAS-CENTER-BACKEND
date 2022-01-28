//CODE ADDED BY MAYRA
const {Schema, model} = require('mongoose');

const BlogCardSchema = Schema({
     name:{
         type: String,
         required:true
     },
     image:{
        type: String,
        required:true,
    }
});

BlogCardSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports= model('BlogCard',BlogCardSchema);