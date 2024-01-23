"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../Controller/postController");
// import { verifyToken } from '../Middleware/VerifyToken';
const router = express_1.default.Router();
router.post('/createpost', postController_1.createpost);
router.get('/getpost/:id', postController_1.getpost);
router.get('/postall', postController_1.getallpost);
exports.default = router;
