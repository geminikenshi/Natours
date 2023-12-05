import express from 'express';
import * as tourController from '../controllers/tourController.js';

const tourRouter = express.Router();

// tourRouter.param('id', tourController.checkID);

// Aliasing
tourRouter
  .route('/top-5-tours')
  .get(tourController.aliasTopTours, tourController.getAllTours);

tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

export default tourRouter;
