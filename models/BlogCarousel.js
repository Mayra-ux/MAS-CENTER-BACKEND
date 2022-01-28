//CODE ADDED BY MAYRA
const {Schema, model} = require('mongoose');

const BlogCarouselSchema = Schema({
     position:{
         type: Number,
         required:true
     },
    image:{
        type: String,
        required:true,
    }
});

BlogCarouselSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports= model('BlogCarousel',BlogCarouselSchema);