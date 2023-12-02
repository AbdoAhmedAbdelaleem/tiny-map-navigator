"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = exports.authentication = void 0;
const crypto_1 = __importDefault(require("crypto"));
const authentication = (salt, password, hashKey) => {
    const combinedData = Buffer.from([Buffer.from(salt), Buffer.from(password)].join('/'));
    const hmac = crypto_1.default.createHmac('sha256', combinedData);
    return hmac.update(hashKey).digest('hex');
};
exports.authentication = authentication;
const random = () => crypto_1.default.randomBytes(128).toString('base64');
exports.random = random;
//# sourceMappingURL=AuthenticationHelper.js.map