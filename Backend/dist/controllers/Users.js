"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const users_1 = require("../db/users");
const logKey = 'Users Controller: ';
// Get All users in db
const getAllUsers = async (req, res) => {
    try {
        console.log(`${logKey} getAllUsers Invoked`);
        const users = await (0, users_1.getUsers)();
        return res.status(200).json(users).end();
    }
    catch (error) {
        console.error(error);
        return res.status(400);
    }
};
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=Users.js.map