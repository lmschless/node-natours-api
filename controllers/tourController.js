import express from 'express';
import fs from 'fs';
import path from 'path';
import Tour from '../models/tourModel';

const __dirname = path.resolve();

// use param middleware to check if id is valid instead of checking inside every function.
const checkID = (req, res, next, val) => {
  console.log(`Tour ID is: ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }
  next(); // only runs if the previous check is successful
};

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing Name or Price',
    });
  }
  next();
};

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; // convert string to num

  // const tour = tours.find((tour) => tour.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

const createTour = (req, res) => {
  res.status(201).json({
    // created
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

export default {
  checkID,
  getAllTours,
  createTour,
  getTour,
  deleteTour,
  updateTour,
  checkBody,
};
