import express from 'express';
import authentication from './authentication';
import polygon from './polygon';
import Users from './Users';
const router = express.Router();

export default (): express.Router => {
  authentication(router);
  polygon(router);
  Users(router);
  return router;
};

