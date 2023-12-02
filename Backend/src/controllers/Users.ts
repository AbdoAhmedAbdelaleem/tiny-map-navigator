import express from 'express';
import { getUsers } from '../db/users'

const logKey = 'Users Controller: ';

// Get All users in db
export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    console.log(`${logKey} getAllUsers Invoked`)
    const users = await getUsers();
    return res.status(200).json(users).end();
  } catch (error) {
    console.error(error);
    return res.status(400);
  }
};
