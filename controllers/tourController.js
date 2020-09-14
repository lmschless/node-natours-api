import express from 'express';
import path from 'path';
import Tour from '../models/tourModel.js';

const __dirname = path.resolve();

const getAllTours = async (req, res) => {
  try {
    // use Tour from tourModel and use mongoose find method. (select)
    const tours = await Tour.find();
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
      message: 'Invalid data sent!',
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

const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

export default {
  getAllTours,
  createTour,
  getTour,
  deleteTour,
  updateTour,
};
