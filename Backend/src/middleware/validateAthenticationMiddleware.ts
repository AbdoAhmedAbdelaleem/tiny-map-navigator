import express from 'express';
import consts from '../Helpers/consts'
import { getUserBySessionToken } from '../db/users';

// This middleware just check if current user has valid token if yes it proceed user request to next middleware
// Now we have Simple Token that can be replace with JWT bearer
// Otherwise it return Forbidden Status
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.get(consts.SESSION_KEY);
    if (!sessionToken)
      return res.status(403).send('Forbidden');

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser)
      return res.status(403).send('Forbidden');
    else
      return next();
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
}
