"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPolygon = exports.getPolygonByName = exports.getPolygonNames = exports.PolygonModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// I am considering Polygon is an object that has Area: array of Point(Point is an object contains x, y numbers)
// I don't like the property to be called area, but I tried to stuck to the Specs as much as I can
// Polygon Config
const PointSchema = {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
};
const PolygonSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    area: { type: [PointSchema], required: true },
});
exports.PolygonModel = mongoose_1.default.model('Polygon', PolygonSchema);
// Polygons Actions
const getPolygonNames = async () => await exports.PolygonModel.find().select("title").exec();
exports.getPolygonNames = getPolygonNames;
const getPolygonByName = async (title) => await exports.PolygonModel.findOne({ title });
exports.getPolygonByName = getPolygonByName;
const createPolygon = async (title, points) => {
    const newPolygon = new exports.PolygonModel({
        title,
        area: points,
    });
    return await newPolygon.save();
};
exports.createPolygon = createPolygon;
//# sourceMappingURL=polygons.js.map