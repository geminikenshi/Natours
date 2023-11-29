import mongoose from 'mongoose';

const tourSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: Number,
  price: { type: Number, required: [true, 'A tour must have a price'] },
});

const Tour = mongoose.model('Tour', tourSchema, 'tours');

export default Tour;
