"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../Controller/commentController");
const router = express_1.default.Router();
router.post('/:postId/createcomment', commentController_1.commentcreate);
router.get('/:postId/getallcomments', commentController_1.getAllComments);
router.post('/:postId/reply/:commentId', commentController_1.replytocomment);
exports.default = router;
