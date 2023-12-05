import mongoose, { Schema } from 'mongoose';

// Define a GeoJSON schema for the point
const PointSchema = new Schema({
  type: { type: String, enum: ['Point'], required: true },
  coordinates: { type: [Number], required: true },
});

// Define the main GeoJSON schema for polygons
interface Polygon {
  title: string;
  area: {
    type: string;
    coordinates: [[number, number]];
  };
}

const PolygonSchema = new Schema<Polygon & Document>({
  title: { type: String, required: true },
  area: { type: { type: String, enum: ['Polygon'], required: true }, coordinates: { type: [[[Number]]], required: true } },
});

// Add a 2dsphere index for spatial queries on the 'area' field
PolygonSchema.index({ area: '2dsphere' });

// Create the model using the schema
export const PolygonModel = mongoose.model('Polygons-test', PolygonSchema);

// Function to get names of all polygons
export const getPolygonNames = async () => await PolygonModel.find().select('title').exec();

// Function to get a polygon by its title
export const getPolygonByName = async (title: string) => await PolygonModel.findOne({ title });

// Function to create a new polygon
export const createPolygon = async (
  title: string,
  coordinates: [number, number][]
): Promise<Polygon & Document> => {

  // Create a new polygon instance
  const newPolygon = new PolygonModel({
    title,
    area: {
      type: 'Polygon',
      coordinates: coordinates, // assuming parsedCoordinates is an array of [number, number]
    },
  });

  // Save the new polygon to the database
  return await newPolygon.save();
};



// Function to find polygons containing a set of points
export const findPolygonsContainingPoints = async (
  points: [number, number][]
): Promise<Polygon[]> => {

  return await PolygonModel.find({
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

