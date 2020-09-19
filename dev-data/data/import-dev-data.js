import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Tour from '../../models/tourModel.js';

const __dirname = path.resolve();

dotenv.config({ path: './config.env' }); // have to import dotenv before app

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// pass connection string and object with options into Mongoose
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log('DB Connection Successful!'))
  .catch((error) => console.log(error));

// Read JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// Import tours json into DB
const importData = async () => {
  try {
    // use mongoose Create method to create a new array containing all the tours from tours.json
    await Tour.create(tours);
    console.log('Data Successfully Loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
// Delete data from collection
const deleteData = async () => {
  try {
    // use mongoose Create method to create a new array containing all the tours from tours.json
    await Tour.deleteMany();
    console.log('Data Successfully Deleted!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// check 3rd argument in process.argv array to see which cli arg was passed in. This allows the user to control which function runs within this script.

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
