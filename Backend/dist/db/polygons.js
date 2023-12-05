"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPolygonsContainingPoints = exports.createPolygon = exports.getPolygonByName = exports.getPolygonNames = exports.PolygonModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define a GeoJSON schema for the point
const PointSchema = new mongoose_1.Schema({
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
});
const PolygonSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    area: { type: { type: String, enum: ['Polygon'], required: true }, coordinates: { type: [[[Number]]], required: true } },
});
// Add a 2dsphere index for spatial queries on the 'area' field
PolygonSchema.index({ area: '2dsphere' });
// Create the model using the schema
exports.PolygonModel = mongoose_1.default.model('Polygons-test', PolygonSchema);
// Function to get names of all polygons
const getPolygonNames = async () => await exports.PolygonModel.find().select('title').exec();
exports.getPolygonNames = getPolygonNames;
// Function to get a polygon by its title
const getPolygonByName = async (title) => await exports.PolygonModel.findOne({ title });
exports.getPolygonByName = getPolygonByName;
// Function to create a new polygon
const createPolygon = async (title, coordinates) => {
    // Parse coordinates as numbers
    const parsedCoordinates = coordinates.map(coord => [Number(coord[0]), Number(coord[1])]);
    // Create a new polygon instance
    const newPolygon = new exports.PolygonModel({
        title,
        area: {
            type: 'Polygon',
            coordinates: coordinates, // assuming parsedCoordinates is an array of [number, number]
        },
    });
    // Save the new polygon to the database
    return await newPolygon.save();
};
exports.createPolygon = createPolygon;
// Function to find polygons containing a set of points
const findPolygonsContainingPoints = async (points) => {
    return await exports.PolygonModel.find({
        area: {
            $geoIntersects: {
                $geometry: {
                    type: 'MultiPoint',
                    coordinates: points[0],
                },
            },
        },
    });
};
exports.findPolygonsContainingPoints = findPolygonsContainingPoints;
//# sourceMappingURL=polygons.js.map