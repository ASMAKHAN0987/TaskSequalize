import { CommentModel } from "../Model/Comments";

export const commentcreate = async(req:any,res:any)=>{
    const id = req.params.postId
    const commenttobe = {
        PostModelId:id,
        userId:req?.body?.userId,
        username:req?.body?.username,
        comment:req?.body?.comment,
      }
    try{
           if(id){
            const createcomment = await CommentModel.create(commenttobe)
            await createcomment.save()
            res.status(201).json(createcomment);
           }
           else{
            res.status(404).json({message: "Comment with this post id is not found"})
           }
      }
      catch(err){

      }
}
//have to make new one
// export const getAllComments = async(req:any,res:any)=>{
//    const id = req.params.postId;
//     try{
//         if(id){
//             const post = await CommentModel.findByPk(id)
//             res.json(post)
//         }else{
//             res.status(404).json({message: "Comment with this post id is not found"})
//         }
//    }
//    catch(err){
//         res.status(401).json({message:'problem with Getting posts from server',err:err})
//    }
// }
export const replytocomment = async(req:any,res:any)=>{
    const id = req.params.postId
    const comment_Id = req.params?.commentId;
    try{
            if(comment_Id){
            const reply = {
             PostModelId:id,
             userId:req?.body?.userId,
             username:req?.body?.username,
             comment:req?.body?.comment,
             parentId:comment_Id
           }
            const createcomment = await CommentModel.create(reply)
            await createcomment.save()
            res.status(201).json(createcomment);
             }
      else{
            res.status(404).json({message: "Id not found"})
           }
        }
      catch(err){

      }

}