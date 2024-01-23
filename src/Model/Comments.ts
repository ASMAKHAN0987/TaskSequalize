import {Table,Model,Column,DataType} from 'sequelize-typescript'

@Table({
    timestamps:false,
    tableName:"CommentModel"
})
export class CommentModel extends Model{
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
    @Column({
        type: DataType.STRING,
        allowNull:false
    })
    comment!:string;
    @Column({
        type: DataType.STRING,
        allowNull:true
    })
    parentId!:string;
}