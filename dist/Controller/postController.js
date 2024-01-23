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
exports.getallpost = exports.getpost = exports.createpost = void 0;
const Post_1 = require("../Model/Post");
const createpost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, desc, userId, username } = req.body;
        if (!title || !desc || !userId || !username) {
            return res.status(400).send({
                success: false,
                message: "Please Fill all fields",
            });
        }
        const newpost = yield Post_1.PostModel.create({ title, desc, userId, username });
        yield newpost.save();
        res.status(200).send({
            messgae: "post created successfully",
        });
    }
    catch (err) {
        res.status(500).json({ err });
    }
});
exports.createpost = createpost;
const getpost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.PostModel.findByPk(req.params.id);
        if (post !== null) {
            res.status(200).json(post);
        }
        else {
            res.status(404).send({
                success: false,
                message: "Post not found",
            });
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getpost = getpost;
const getallpost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.PostModel.findAll({});
        if (!post) {
            return res.status(200).json({
                success: false,
                message: "No Blogs Found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "All Blogs lists",
            posts: post
        });
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: "internal server error",
        });
    }
});
exports.getallpost = getallpost;
