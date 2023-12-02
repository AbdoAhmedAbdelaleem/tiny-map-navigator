import express from 'express';
import { isAuthenticated } from '../middleware/validateAthenticationMiddleware'
import { getAllUsers } from '../controllers/Users';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
};