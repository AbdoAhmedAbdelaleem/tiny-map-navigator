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
const Users_1 = require("../Users");
const usersModule = __importStar(require("../../db/users"));
const globals_1 = require("@jest/globals");
globals_1.jest.mock('../../db/users');
describe('getAllUsers', () => {
    afterEach(() => {
        globals_1.jest.clearAllMocks();
    });
    // It Mocks array of Users and call getAllUsers and check success if it returns Mock data otherwise fail
    it('should return all users', async () => {
        const mockUsers = [
            { email: 'user@users.com' },
            { email: 'user2@user.com' },
        ];
        globals_1.jest.spyOn(usersModule, 'getUsers').mockResolvedValue(mockUsers);
        const mockRequest = {};
        const mockResponse = {
            status: globals_1.jest.fn().mockReturnThis(),
            json: globals_1.jest.fn(),
        };
        await (0, Users_1.getAllUsers)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
    });
    it('should handle errors', async () => {
        const mockRequest = {};
        const mockResponse = {
            status: globals_1.jest.fn().mockReturnThis(),
        };
        globals_1.jest.spyOn(usersModule, 'getUsers').mockRejectedValue(new Error('Database error'));
        await (0, Users_1.getAllUsers)(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
    });
});
//# sourceMappingURL=userController.test.js.map