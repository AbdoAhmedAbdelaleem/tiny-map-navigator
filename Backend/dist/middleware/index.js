"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePipelines = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("../router"));
const path_1 = __importDefault(require("path"));
// Just configure Middlewares we have, we have now few middlwares
// CORS, Compression, Body and Cookie parser
const configurePipelines = (app) => {
    // Configure cross origin
    app.use((0, cors_1.default)({
        credentials: true,
    }));
    // configure compression pipeline used in Authentications
    app.use((0, compression_1.default)());
    // To read json from body and cookies
    app.use((0, cookie_parser_1.default)());
    app.use(body_parser_1.default.json());
    // Serve Api Routes
    app.use('/api', (0, router_1.default)());
    // Serve React files
    const publicPath = path_1.default.join(__dirname, '../../public');
    app.use(express_1.default.static(publicPath));
    // Serve the main HTML file for all routes
    app.get('*', (req, res) => {
        console.log('Request to static file: ' + req.path);
        res.sendFile(path_1.default.join(publicPath, 'index.html'));
    });
};
exports.configurePipelines = configurePipelines;
//# sourceMappingURL=index.js.map