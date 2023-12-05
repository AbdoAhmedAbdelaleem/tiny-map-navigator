"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateAthenticationMiddleware_1 = require("../middleware/validateAthenticationMiddleware");
const polygon_1 = require("../controllers/polygon");
exports.default = (router) => {
    router.get('/polygon/list', validateAthenticationMiddleware_1.isAuthenticated, polygon_1.getAllPolygons);
    router.get('/polygon/:title', validateAthenticationMiddleware_1.isAuthenticated, polygon_1.getPolygonDetails);
    router.post('/polygon', validateAthenticationMiddleware_1.isAuthenticated, polygon_1.AddPolygon);
    router.post('/polygon/find', validateAthenticationMiddleware_1.isAuthenticated, polygon_1.FindPolygonsByPoints);
};
//# sourceMappingURL=polygon.js.map