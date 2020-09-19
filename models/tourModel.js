import mongoose from 'mongoose';

// create mongoose schema model object
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    // 2nd array value is an err string
    required: [true, 'A tour must have a name'],
    trim: true, // automatically removes whitespace from string
    unique: true, // cannot have two tour docs with same name
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true, // automatically removes whitespace from string
    required: [true, 'A tour must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    // store ref to the img in db. store img in src files
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  // specify an array of strings
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(), // use JS Date constructor
    select: false, // not included in res by default
  },
  startDates: [Date],
});
// model names are uppercase (classes)
const Tour = mongoose.model('Tour', tourSchema);

export default Tour;
