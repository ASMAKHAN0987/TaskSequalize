import {Table,Model,Column,DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript'

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
    @ForeignKey(() => CommentModel)
    @Column({
        type: DataType.INTEGER 
    })
    parentId!: number;

    @BelongsTo(() => CommentModel, { as: 'Comment', onDelete: 'CASCADE' })
    parentComment!: CommentModel;

    @HasMany(() => CommentModel, { as: 'Replies'})
    replies!: CommentModel[];
}