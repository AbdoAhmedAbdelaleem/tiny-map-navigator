"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("./authentication"));
const polygon_1 = __importDefault(require("./polygon"));
const Users_1 = __importDefault(require("./Users"));
const router = express_1.default.Router();
exports.default = () => {
    (0, authentication_1.default)(router);
    (0, polygon_1.default)(router);
    (0, Users_1.default)(router);
    return router;
};
//# sourceMappingURL=index.js.map