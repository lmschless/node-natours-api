import express from 'express';
import controller from '../controllers/tourController.js';
const { getAllTours, createTour, getTour, deleteTour, updateTour } = controller;

const router = express.Router();
router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);

export default router;
