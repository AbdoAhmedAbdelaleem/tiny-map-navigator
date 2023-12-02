import mongoose from 'mongoose';

// User is an object that contains Email string , Authentication that contains Salt, Password, session token
 
// User Config
export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export interface User extends Document {
  email: string;
  authentication: {
    password: string;
    salt?: string;
    sessionToken?: string;
  };
}

export const UserModel = mongoose.model<User>('User', UserSchema);

// User Actions
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
