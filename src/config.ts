import { Sequelize } from "sequelize-typescript";
import { UserModel } from "./Model/User";
import { PostModel } from "./Model/Post";
import { CommentModel } from "./Model/Comments";
const connection  = new Sequelize(
    {
        dialect:"mysql",
        host:"localhost",
        username:"root",
        password:"PHW#84#jeor",
        database:'sequel',
        logging:false,
        models:[UserModel,PostModel,CommentModel]
    }
)
export default connection