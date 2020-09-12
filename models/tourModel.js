import mongoose from 'mongoose';

// create mongoose schema model object
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    // 2nd array value is an err string
    required: [true, 'A tour must have a name'],
    unique: true, // cannot have two tour docs with same name
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});
// model names are uppercase (classes)
const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
