import express from 'express';
import { isAuthenticated } from '../middleware/validateAthenticationMiddleware'
import { getAllPolygons, getPolygonDetails, AddPolygon, FindPolygonsByPoints } from '../controllers/polygon';

export default (router: express.Router) => {
  router.get('/polygon/list', isAuthenticated, getAllPolygons);
  router.get('/polygon/:title', isAuthenticated, getPolygonDetails);
  router.post('/polygon', isAuthenticated, AddPolygon);
  router.post('/polygon/find', isAuthenticated, FindPolygonsByPoints);
};