"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const consts_1 = __importDefault(require("../Helpers/consts"));
const users_1 = require("../db/users");
// This middleware just check if current user has valid token if yes it proceed user request to next middleware
// Now we have Simple Token that can be replace with JWT bearer
// Otherwise it return Forbidden Status
const isAuthenticated = async (req, res, next) => {
    try {
        const sessionToken = req.get(consts_1.default.SESSION_KEY);
        if (!sessionToken)
            return res.status(403).send('Forbidden');
        const existingUser = await (0, users_1.getUserBySessionToken)(sessionToken);
        if (!existingUser)
            return res.status(403).send('Forbidden');
        else
            return next();
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=validateAthenticationMiddleware.js.map