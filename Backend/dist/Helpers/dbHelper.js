"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDb = () => {
    const MONGO_URL = process.env.MONGO_URL;
    mongoose_1.default.Promise = Promise;
    mongoose_1.default.connect(MONGO_URL);
    mongoose_1.default.connection.on('error', (error) => console.error(error));
    mongoose_1.default.connection.once('open', () => console.log('Connected Successfulty to Mongo'));
};
exports.connectToDb = connectToDb;
//# sourceMappingURL=dbHelper.js.map