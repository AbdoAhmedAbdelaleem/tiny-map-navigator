"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const consts_1 = __importDefault(require("../Helpers/consts"));
const users_1 = require("../db/users");
const AuthenticationHelper_1 = require("../Helpers/AuthenticationHelper");
const logKey = 'Auth Controller: ';
// Get Email, password from body
// ckeck if email exist and use salt for sepcified user, Hashkey for encyption Algo and sepcified password and get secret 
//   if generted secret === same password for sepcified email It authenticate otherwise BadRequest
//   Generate Session token that used in resource Autherization (we renew it for security purposes)
// If not exist return Status 400
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`${logKey} Request to login with Email: ${email}`);
        if (!email || !password) {
            console.log(`${logKey} + Invalid Password`);
            res.status(400).send('Email and Password are required');
            return;
        }
        // Get user by email and get salt and password with record as by default these data not selected
        const user = await (0, users_1.getUserByEmail)(email).select('+authentication.salt +authentication.password');
        if (!user) {
            console.log(`${logKey} Email is not Exist- ${email}`);
            return res.status(400).send('User not exist');
        }
        ;
        const expectedHash = (0, AuthenticationHelper_1.authentication)(user.authentication.salt, password, consts_1.default.HASH_KEY);
        if (user.authentication.password != expectedHash) {
            console.log(`${logKey} Invalid Password for ${email}`);
            return res.sendStatus(403);
        }
        const salt = (0, AuthenticationHelper_1.random)();
        user.authentication.sessionToken = (0, AuthenticationHelper_1.authentication)(salt, user._id.toString(), consts_1.default.HASH_KEY);
        await user.save();
        // Null properties for User before sening it back we can user her otther ViewModel but here I am just nulling properties
        user.authentication.password = null;
        user.authentication.salt = null;
        res.cookie(consts_1.default.SESSION_KEY, user.authentication.sessionToken, { domain: 'localhost', path: '/' });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.error(error);
        return res.status(400);
    }
};
exports.login = login;
// Register user, check email, password from the Request body, validate them just simple checks for now
// if valid it generate random salt and use it and password and hash key to generated hashed password
// Save the use with email, sale and Hashed password into db
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        var validateResult = await validateUserRegister(email, password);
        if (validateResult.length > 0) {
            res.status(400).send(validateResult);
            return;
        }
        const salt = (0, AuthenticationHelper_1.random)();
        const user = await (0, users_1.createUser)({
            email,
            authentication: {
                salt,
                password: (0, AuthenticationHelper_1.authentication)(salt, password, consts_1.default.HASH_KEY),
            },
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error);
        return;
    }
};
exports.register = register;
// Check if email/ password is null => error message
// Check if Email is alreay exist => error message
// otherwise return empty message
const validateUserRegister = async (email, password) => {
    if (!email || !password)
        return 'Invalid user name or password';
    const existingUser = await (0, users_1.getUserByEmail)(email);
    if (existingUser)
        return 'Email Already Exist';
    return '';
};
//# sourceMappingURL=authentication.js.map