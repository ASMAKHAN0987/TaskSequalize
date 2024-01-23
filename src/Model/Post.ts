import {Table,Model,Column,DataType} from 'sequelize-typescript'
@Table({
    timestamps:false,
    tableName:"PostModel"
})
export class PostModel extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title!:string;
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    desc!:string;
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    userId!:string;
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    username!:string;
}