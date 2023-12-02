"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPolygon = exports.getPolygonDetails = exports.getAllPolygons = void 0;
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
//# sourceMappingURL=polygon.js.map