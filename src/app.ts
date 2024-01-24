import { urlencoded,json } from 'body-parser'
import express from 'express'
import authRoutes from './Router/auth'
import postRoute from './Router/postroutes'
import connection from './config'
import commentRoute from './Router/commentroute'
import { PostModel } from './Model/Post'
import { CommentModel } from './Model/Comments'
const app = express()
app.use(json())
app.use(urlencoded({extended:true}))
app.use((
    err: Error,
    req:express.Request,
    res:express.Response,
    next:express.NextFunction
)=>{
    res.status(500).json({message:err.message})
});
connection.sync().then(()=>{
    console.log("Database synced successfully")
}).catch((err)=>{
    console.log("Err",err)
})
app.listen(8080,()=>{
    console.log('Server listening on port 8080');
})
PostModel.hasMany(CommentModel,{onUpdate: 'CASCADE'})
CommentModel.belongsTo(PostModel,{onDelete: 'CASCADE'})

// Self-referencing association
CommentModel.hasMany(CommentModel, { as: 'Replies', foreignKey: 'parentId' });

// You might also want to add a foreign key constraint to ensure data integrity
CommentModel.belongsTo(CommentModel, { as:'Comment', foreignKey: 'parentId', onDelete: 'CASCADE' });

app.use('/api/auth',authRoutes);

app.use('/api/posts',postRoute);

app.use('/api/comment',commentRoute)

