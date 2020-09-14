import express from 'express';
import controller from '../controllers/tourController.js';

const { getAllTours, createTour, getTour, deleteTour, updateTour } = controller;

const router = express.Router();

// Create a checkBody middleware function
// Check if body contains the name and price properties
// If not, send back a 400 (invalid req)

// using imported middleware from tourController to check if ID is valid.
// router.param('id', checkID);
// add checkBody middleware to be called before create tour
router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);

export default router;
