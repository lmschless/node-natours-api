import express from 'express';
import controller from '../controllers/tourController.js';
const { getAllTours, createTour, getTour, deleteTour, updateTour, checkID } = controller;

const router = express.Router();

// using imported middleware from tourController to check if ID is valid.
router.param('id', checkID);

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);

export default router;
