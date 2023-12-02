import express from 'express';
import consts from '../Helpers/consts'
import { getUserByEmail, createUser } from '../db/users';
import { authentication, random } from '../Helpers/AuthenticationHelper';

const logKey = 'Auth Controller: ';

// Get Email, password from body
// ckeck if email exist and use salt for sepcified user, Hashkey for encyption Algo and sepcified password and get secret 
//   if generted secret === same password for sepcified email It authenticate otherwise BadRequest
//   Generate Session token that used in resource Autherization (we renew it for security purposes)
// If not exist return Status 400
export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    console.log(`${logKey} Request to login with Email: ${email}`);

    if (!email || !password) {
      console.log(`${logKey} + Invalid Password`);
      res.status(400).send('Email and Password are required');
      return
    }

    // Get user by email and get salt and password with record as by default these data not selected
    const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

    if (!user) {
      console.log(`${logKey} Email is not Exist- ${email}`);
      return res.status(400).send('User not exist');
    };

    const expectedHash = authentication(user.authentication.salt, password, consts.HASH_KEY);

    if (user.authentication.password != expectedHash) {
      console.log(`${logKey} Invalid Password for ${email}`);
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(salt, user._id.toString(), consts.HASH_KEY);

    await user.save();

    // Null properties for User before sening it back we can user her otther ViewModel but here I am just nulling properties
    user.authentication.password = null;
    user.authentication.salt = null;

    res.cookie(consts.SESSION_KEY, user.authentication.sessionToken, { domain: 'localhost', path: '/' });

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.status(400);
  }
};

// Register user, check email, password from the Request body, validate them just simple checks for now
// if valid it generate random salt and use it and password and hash key to generated hashed password
// Save the use with email, sale and Hashed password into db
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    var validateResult = await validateUserRegister(email, password);
    if (validateResult.length > 0) {
      res.status(400).send(validateResult);
      return
    }

    const salt = random();
    const user = await createUser({
      email,
      authentication: {
        salt,
        password: authentication(salt, password, consts.HASH_KEY),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
    return
  }
}

// Check if email/ password is null => error message
// Check if Email is alreay exist => error message
// otherwise return empty message
const validateUserRegister = async (email: string, password: string) => {
  if (!email || !password)
    return 'Invalid user name or password';

  const existingUser = await getUserByEmail(email);

  if (existingUser)
    return 'Email Already Exist';

  return '';
}