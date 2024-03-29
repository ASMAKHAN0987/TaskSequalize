"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let CommentModel = class CommentModel extends sequelize_typescript_1.Model {
};
exports.CommentModel = CommentModel;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], CommentModel.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], CommentModel.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], CommentModel.prototype, "comment", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CommentModel),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER
    })
], CommentModel.prototype, "parentId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => CommentModel, { as: 'Comment', onDelete: 'CASCADE' })
], CommentModel.prototype, "parentComment", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => CommentModel, { as: 'Replies' })
], CommentModel.prototype, "replies", void 0);
exports.CommentModel = CommentModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: false,
        tableName: "CommentModel"
    })
], CommentModel);
