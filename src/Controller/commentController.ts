import { CommentModel } from "../Model/Comments";
import { PostModel } from "../Model/Post";

export const commentcreate = async(req:any,res:any)=>{
    const id = req.params.postId
    const commenttobe = {
        PostModelId:id,
        parentId:null,
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
const fetchCommentsRecursive = async (postId:number, parentId = null):Promise<CommentWithReplies[]>  => {
    const comments = await CommentModel.findAll({
      where: {
        PostModelId: postId,
        parentId,
      },
      include: {
        model: CommentModel,
        as: 'Replies',
      },
    });
  
    const results = [];
  
    for (const comment of comments) {
      const nestedReplies = await fetchCommentsRecursive(postId, comment.id);
      results.push({
        ...comment.toJSON(),
        Replies: nestedReplies,
      });
    }
  
    return results;
    // return comments;
  };
const fetchCommentsForPost = async (postId:number) => {
    try {
      const comments = await fetchCommentsRecursive(postId);
      return comments;
    } catch (err) {
      console.error('Error fetching comments for post:', err);
      return null;
    }
  };
export const getAllComments = async(req:any,res:any)=>{
   const commentId = req.params.postId;
    try{
        if(commentId){
          const post = await PostModel.findOne(req.params.id)
          if(!post){
           res.status(404).send({
               success: false,
               message: "Post not found",
             });
            }else{
            const result = await fetchCommentsForPost(commentId)
            res.status(200).json({post:post,comments:result})
           }
      }else{
        res.status(404).json({message:"id not found"})
      }
   }
   catch(err){
        res.status(401).json({message:'problem with Getting posts from server',err:err})
   }
}
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