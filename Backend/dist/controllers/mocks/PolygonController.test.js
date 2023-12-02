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
const polygon_1 = require("../polygon");
const polygonsModule = __importStar(require("../../db/polygons"));
const globals_1 = require("@jest/globals");
globals_1.jest.mock('../../db/polygons');
describe('This test used to Get All Polygon Name & Polygon Details', () => {
    afterEach(() => {
        globals_1.jest.clearAllMocks();
    });
    // Mock array of polygons and call getPolygonNames and assert if it will return specified polygon names
    it('should return all Polugons', async () => {
        const mockPolygons = [
            { title: 'Polygon-Test-1', area: [{ x: 0, y: 0 }, { x: 10, y: 10 }, { x: 100, y: 100 }, { x: 200, y: 0 }] },
            { title: 'Polygon-Test-2', area: [{ x: 0, y: 0 }] },
            { title: 'Polygon-Test-Empty', area: [] },
        ];
        // Spy on the function and mock its resolved value
        globals_1.jest.spyOn(polygonsModule, 'getPolygonNames').mockResolvedValue(mockPolygons);
        const mockRequest = {};
        const mockResponse = {
            status: globals_1.jest.fn().mockReturnThis(),
            json: globals_1.jest.fn(),
        };
        // Call the function and await the response
        await (0, polygon_1.getAllPolygons)(mockRequest, mockResponse);
        // Make assertions on the response
        expect(mockResponse.json).toHaveBeenCalledWith(mockPolygons.map((polygon) => polygon.title));
    });
    // Mock Polygon Details endpoint it have same data or not it success if return the mock polygon other wise fail
    it('should return PolgonDetails', async () => {
        const mockPolygon = {
            title: 'Polygon-Test-1',
            area: [{ x: 0, y: 0 }, { x: 10, y: 10 }, { x: 100, y: 100 }, { x: 200, y: 0 }],
        };
        // Spy on the function and mock its resolved value
        globals_1.jest.spyOn(polygonsModule, 'getPolygonByName').mockResolvedValue(mockPolygon);
        const mockRequest = {
            params: { title: mockPolygon.title },
        };
        const mockResponse = {
            status: globals_1.jest.fn().mockReturnThis(),
            json: globals_1.jest.fn(),
        };
        // Call the function and await the response
        await (0, polygon_1.getPolygonDetails)(mockRequest, mockResponse);
        // Make assertions on the response
        expect(mockResponse.json).toHaveBeenCalledWith(mockPolygon);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
});
//# sourceMappingURL=PolygonController.test.js.map