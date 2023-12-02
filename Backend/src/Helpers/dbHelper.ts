import mongoose from 'mongoose';

export const connectToDb = ()=> {
    const MONGO_URL = process.env.MONGO_URL
    mongoose.Promise = Promise;
    mongoose.connect(MONGO_URL);
    
    mongoose.connection.on('error', (error: Error) => console.error(error));
    mongoose.connection.once('open', () => console.log('Connected Successfulty to Mongo'));
}

