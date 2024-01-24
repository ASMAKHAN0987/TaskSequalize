"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./Router/auth"));
const postroutes_1 = __importDefault(require("./Router/postroutes"));
const config_1 = __importDefault(require("./config"));
const commentroute_1 = __importDefault(require("./Router/commentroute"));
const Post_1 = require("./Model/Post");
const Comments_1 = require("./Model/Comments");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
config_1.default.sync().then(() => {
    console.log("Database synced successfully");
}).catch((err) => {
    console.log("Err", err);
});
app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
Post_1.PostModel.hasMany(Comments_1.CommentModel, { onUpdate: 'CASCADE' });
Comments_1.CommentModel.belongsTo(Post_1.PostModel, { onDelete: 'CASCADE' });
// Self-referencing association
Comments_1.CommentModel.hasMany(Comments_1.CommentModel, { as: 'Replies', foreignKey: 'parentId' });
// You might also want to add a foreign key constraint to ensure data integrity
Comments_1.CommentModel.belongsTo(Comments_1.CommentModel, { as: 'Comment', foreignKey: 'parentId', onDelete: 'CASCADE' });
app.use('/api/auth', auth_1.default);
app.use('/api/posts', postroutes_1.default);
app.use('/api/comment', commentroute_1.default);
