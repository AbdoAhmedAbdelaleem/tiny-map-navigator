# tiny-map-navigator

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [Scripts](#scripts)
- [Docker][#Docker]

## Installation

Clone the repository: `https://github.com/AbdoAhmedAbdelaleem/tiny-map-navigator`

# Backend
1. Navigate to the project folder: `cd Backend`
2. Install dependencies: `npm install`
3. Build Command: `npm run build`
4. Run Command: `npm start`

# Frontend
2. Navigate to the project folder: `cd Frontend`
3. Install dependencies: `npm install`
4. Build Command: `npm run build`
5. Run Command: `npm run`
Navigate browser locally on http://localhost:3000

Don't forget to add in Frontend REACT_APP_API_URL,  to be point to the Backend initially http://localhost:8080/api/
REACT_APP_MAPBOXGL_ACCESSTOKEN  YOUR ACCESS TOKEN

Also Add  MONGO_URL in .env to be the url for the mongo DB



## Usage

Don integration between react and node js, it has 3 main component login, Map, Users

## Folder Structure

This repo contains 2 main project 
-- Root
   -- Frontend (React& Redux)
   -- Backend (Node js)

## Dependencies

- Node.js
- React
- Redux
- Express
- MongoDB


## Scripts

Frontend
- `npm start`: Run the project in development mode.
- `npm run build:prod`: Build the production-ready code.
- `npm run build`: Build the develp code.

Backend
- `npm start`: Run the project in development mode.
- `npm run build`: Build the develp code.
- `npm run test`: start the unit test.


## Docker 
- we didn't pull to any container-hub but we shipped this product by Docker to run the docker make sure you adjusted the vaiables in the .env as described above
then run docker-compose up
 