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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../Model/User");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please Fill all fields",
            });
        }
        //existing user
        const exisitingUser = yield User_1.UserModel.findOne({ where: { email: email } });
        if (exisitingUser) {
            return res.status(401).send({
                success: false,
                message: "user already exisits",
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield User_1.UserModel.create({ username, email, password: hashedPassword });
        // const user = new UserModel({username,email,password:hashedPassword})
        yield user.save();
        return res.status(201).send({
            success: true,
            message: "New User Created",
            user,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Error In Register callback",
            success: false,
            err,
        });
    }
});
exports.signup = signup;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                message: "Please provide email or password",
            });
        }
        const user = yield User_1.UserModel.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "email is not registerd",
            });
        }
        //password
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invlid username or password",
            });
        }
        return res.status(200).send({
            success: true,
            message: "succesfully login"
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In Login Callcback",
            error,
        });
    }
});
exports.loginController = loginController;
