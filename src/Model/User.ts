import {Table,Model,Column,DataType} from 'sequelize-typescript'

@Table({
    timestamps:false,
    tableName:"UserModel"
})
export class UserModel extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    username!:string;
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    email!:string;
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    password!:string;
}