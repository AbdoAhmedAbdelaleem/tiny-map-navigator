import express from 'express';
import { connectToDb } from './Helpers/dbHelper'
import { configurePipelines } from './middleware'
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

configurePipelines(app)

connectToDb()
