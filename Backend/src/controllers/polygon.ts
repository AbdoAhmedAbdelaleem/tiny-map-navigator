import express from 'express';
import { getPolygonByName, getPolygonNames, createPolygon, findPolygonsContainingPoints } from '../db/polygons'

const logKey = 'Polygon Controller: ';

//Get All Polygon titles, then map it to just array[string]
export const getAllPolygons = async (req: express.Request, res: express.Response) => {
  try {
    console.log(`${logKey} getAllPolygons Invoked`)
    const polgonNames = await getPolygonNames();
    return res.status(200).json(polgonNames.map(e => e.title));
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

// Get Polygontile from params and get it from DB
export const getPolygonDetails = async (req: express.Request, res: express.Response) => {
  try {
    const polygonTitle = req.params.title;
    console.log(`${logKey} getPolygonDetails for ${polygonTitle} Invoked`)
    const polygonDetails = await getPolygonByName(polygonTitle);
    if (!polygonDetails) {
        console.log(`${logKey} No getPolygonDetails with title '${polygonTitle}' Invoked`)
        return res.status(400).send('Polygon not exist');
    };
    return res.status(200).json(polygonDetails);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

// Get Polygon Data from Body And Add it to DB
export const AddPolygon = async (req: express.Request, res: express.Response) => {
    try {
      const {title, area} = req.body;
      const polygon = createPolygon(title, area);
      return res.status(200).json(polygon).end();
    } catch (error) {
      console.error(error);
      return res.sendStatus(400);
    }
  };

  // Controller method to find polygons by points
export const FindPolygonsByPoints = async (req: express.Request, res: express.Response) => {
  try {
    // Assuming the request body contains an array of points in the format { type, coordinates }
    const points = req.body.points;

    if (!points || !Array.isArray(points) || points.length === 0) {
      return res.status(400).json({ error: 'Invalid or missing points in the request body' });
    }

    // Call the function to find polygons containing the specified points
    const polygons = await findPolygonsContainingPoints(points);

    return res.status(200).json(polygons);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};