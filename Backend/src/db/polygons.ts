import mongoose from 'mongoose';

// I am considering Polygon is an object that has Area: array of Point(Point is an object contains x, y numbers)
// I don't like the property to be called area, but I tried to stuck to the Specs as much as I can

// Polygon Config
const PointSchema = {
  x: { type: Number, required: true },
  y: { type: Number, required: true },
};

const PolygonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  area: { type: [PointSchema], required: true },
});

export const PolygonModel = mongoose.model('Polygon', PolygonSchema);

// Polygons Actions
export const getPolygonNames = async () => await PolygonModel.find().select("title").exec();
export const getPolygonByName = async (title: string) => await PolygonModel.findOne({ title });
export const createPolygon = async (title: string, points: []) => {
  const newPolygon = new PolygonModel({
    title,
    area: points,
  });
  return await newPolygon.save();
};