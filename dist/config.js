"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("./Model/User");
const Post_1 = require("./Model/Post");
const Comments_1 = require("./Model/Comments");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "PHW#84#jeor",
    database: 'sequel',
    logging: false,
    models: [User_1.UserModel, Post_1.PostModel, Comments_1.CommentModel]
});
exports.default = connection;
