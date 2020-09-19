/* eslint-disable node/no-unsupported-features/es-syntax */
import express from 'express';
import path from 'path';
import Tour from '../models/tourModel.js';

const __dirname = path.resolve();

const getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    // Build query
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // loop through queryObj and delete any queries that match the excluded fields
    excludedFields.forEach((el) => delete queryObj[el]);

    //// 2) Advanced Filtering
    // filter object for >= 5
    // {difficulty : 'easy, duration: {$gte:5 }
    // req.query filter object:
    // { duration: { gte: '5' }, difficulty: 'easy' }

    // replace gte, gt, lte, lt
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => {
      return `$${match}`;
    });
    console.log(JSON.parse(queryStr));

    // use Tour from tourModel and use mongoose find method. (select)
    let query = Tour.find(JSON.parse(queryStr));

    // 3) Sorting
    if (req.query.sort) {
      // replace commas with spaces so mongoose can use multiple sort by categories.
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
      // sort('price ratingsAverage')
    } else {
      // default sort when query doesn't contain one
      query = query.sort('-createdAt');
    }

    // 4) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      // default: exclude mongo's __v field
      query = query.select('-__v');
    }

    // Execute query
    const tours = await query;

    // using mongoose methods to query
    // const query = Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // Send response after awaiting query
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // findById is a helper function to do:
    // Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// use async/await
// use Tour model directly and call the create method.
const createTour = async (req, res) => {
  try {
    // saves the returned promise as newTour which accepted the request body object.
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      // created
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

const updateTour = async (req, res) => {
  try {
    // findByIdAndUpdate takes an id, what to update, and an options obj
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    // don't save as variable or it'll create a mongoose error.
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

export default {
  getAllTours,
  createTour,
  getTour,
  deleteTour,
  updateTour,
};
