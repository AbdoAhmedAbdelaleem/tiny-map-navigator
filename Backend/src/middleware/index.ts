import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from '../router';
import path from 'path';

// Just configure Middlewares we have, we have now few middlwares
// CORS, Compression, Body and Cookie parser
export const configurePipelines = (app: express.Application) => {
  // Configure cross origin
  app.use(cors({
    credentials: true,
  }));

  // configure compression pipeline used in Authentications
  app.use(compression());

  // To read json from body and cookies
  app.use(cookieParser());
  app.use(bodyParser.json());

  // Serve Api Routes
  app.use('/api', router());

  // Serve React files
  const publicPath = path.join(__dirname, '../../public');
  app.use(express.static(publicPath));
  // Serve the main HTML file for all routes
  app.get('*', (req, res) => {
    console.log('Request to static file: ' + req.path)
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}


