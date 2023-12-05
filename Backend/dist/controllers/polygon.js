"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindPolygonsByPoints = exports.AddPolygon = exports.getPolygonDetails = exports.getAllPolygons = void 0;
const polygons_1 = require("../db/polygons");
const logKey = 'Polygon Controller: ';
//Get All Polygon titles, then map it to just array[string]
const getAllPolygons = async (req, res) => {
    try {
        console.log(`${logKey} getAllPolygons Invoked`);
        const polgonNames = await (0, polygons_1.getPolygonNames)();
        return res.status(200).json(polgonNames.map(e => e.title));
    }
    catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};
exports.getAllPolygons = getAllPolygons;
// Get Polygontile from params and get it from DB
const getPolygonDetails = async (req, res) => {
    try {
        const polygonTitle = req.params.title;
        console.log(`${logKey} getPolygonDetails for ${polygonTitle} Invoked`);
        const polygonDetails = await (0, polygons_1.getPolygonByName)(polygonTitle);
        if (!polygonDetails) {
            console.log(`${logKey} No getPolygonDetails with title '${polygonTitle}' Invoked`);
            return res.status(400).send('Polygon not exist');
        }
        ;
        return res.status(200).json(polygonDetails);
    }
    catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};
exports.getPolygonDetails = getPolygonDetails;
// Get Polygon Data from Body And Add it to DB
const AddPolygon = async (req, res) => {
    try {
        const { title, area } = req.body;
        const polygon = (0, polygons_1.createPolygon)(title, area);
        return res.status(200).json(polygon).end();
    }
    catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};
exports.AddPolygon = AddPolygon;
// Controller method to find polygons by points
const FindPolygonsByPoints = async (req, res) => {
    try {
        // Assuming the request body contains an array of points in the format { type, coordinates }
        const points = req.body.points;
        if (!points || !Array.isArray(points) || points.length === 0) {
            return res.status(400).json({ error: 'Invalid or missing points in the request body' });
        }
        // Call the function to find polygons containing the specified points
        const polygons = await (0, polygons_1.findPolygonsContainingPoints)(points);
        return res.status(200).json(polygons);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
    }
};
exports.FindPolygonsByPoints = FindPolygonsByPoints;
//# sourceMappingURL=polygon.js.map