"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateAthenticationMiddleware_1 = require("../middleware/validateAthenticationMiddleware");
const Users_1 = require("../controllers/Users");
exports.default = (router) => {
    router.get('/users', validateAthenticationMiddleware_1.isAuthenticated, Users_1.getAllUsers);
};
//# sourceMappingURL=Users.js.map