"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replytocomment = exports.getAllComments = exports.commentcreate = void 0;
const Comments_1 = require("../Model/Comments");
const commentcreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const id = req.params.postId;
    const commenttobe = {
        PostModelId: id,
        userId: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userId,
        username: (_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.username,
        comment: (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.comment,
    };
    try {
        if (id) {
            const createcomment = yield Comments_1.CommentModel.create(commenttobe);
            yield createcomment.save();
            res.status(201).json(createcomment);
        }
        else {
            res.status(404).json({ message: "Comment with this post id is not found" });
        }
    }
    catch (err) {
    }
});
exports.commentcreate = commentcreate;
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.postId;
    try {
        if (id) {
            const post = yield Comments_1.CommentModel.findByPk(id);
            res.json(post);
        }
        else {
            res.status(404).json({ message: "Comment with this post id is not found" });
        }
    }
    catch (err) {
        res.status(401).json({ message: 'problem with Getting posts from server', err: err });
    }
});
exports.getAllComments = getAllComments;
const replytocomment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f, _g;
    const id = req.params.postId;
    const comment_Id = (_d = req.params) === null || _d === void 0 ? void 0 : _d.commentId;
    try {
        if (comment_Id) {
            const reply = {
                PostModelId: id,
                userId: (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.userId,
                username: (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.username,
                comment: (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.comment,
                parentId: comment_Id
            };
            const createcomment = yield Comments_1.CommentModel.create(reply);
            yield createcomment.save();
            res.status(201).json(createcomment);
        }
        else {
            res.status(404).json({ message: "Id not found" });
        }
    }
    catch (err) {
    }
});
exports.replytocomment = replytocomment;
