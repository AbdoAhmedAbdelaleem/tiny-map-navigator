import { getAllPolygons, getPolygonDetails } from '../polygon';
import * as polygonsModule from '../../db/polygons';
import { jest } from '@jest/globals';

jest.mock('../../db/polygons');

describe('This test used to Get All Polygon Name & Polygon Details', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Mock array of polygons and call getPolygonNames and assert if it will return specified polygon names
  it('should return all Polugons', async () => {
    const mockPolygons: any = [
      { title: 'Polygon-Test-1', area: [{ x: 0, y: 0 }, { x: 10, y: 10 }, { x: 100, y: 100 }, { x: 200, y: 0 }] },
      { title: 'Polygon-Test-2', area: [{ x: 0, y: 0 }] },
      { title: 'Polygon-Test-Empty', area: [] },
    ];

    // Spy on the function and mock its resolved value
    jest.spyOn(polygonsModule, 'getPolygonNames').mockResolvedValue(mockPolygons);

    const mockRequest: any = {};
    const mockResponse: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the function and await the response
    await getAllPolygons(mockRequest, mockResponse);

    // Make assertions on the response
    expect(mockResponse.json).toHaveBeenCalledWith(mockPolygons.map((polygon: any) => polygon.title));
  });

  // Mock Polygon Details endpoint it have same data or not it success if return the mock polygon other wise fail
  it('should return PolgonDetails', async () => {
    const mockPolygon: any = {
      title: 'Polygon-Test-1',
      area: [{ x: 0, y: 0 }, { x: 10, y: 10 }, { x: 100, y: 100 }, { x: 200, y: 0 }],
    };

    // Spy on the function and mock its resolved value
    jest.spyOn(polygonsModule, 'getPolygonByName').mockResolvedValue(mockPolygon);

    const mockRequest: any = {
      params: { title: mockPolygon.title },
    };
    const mockResponse: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the function and await the response
    await getPolygonDetails(mockRequest, mockResponse);

    // Make assertions on the response
    expect(mockResponse.json).toHaveBeenCalledWith(mockPolygon);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

});
