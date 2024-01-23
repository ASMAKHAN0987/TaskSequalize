import { RequestHandler } from "express";
import { PostModel } from "../Model/Post";

export const createpost:RequestHandler = async(req:any,res:any)=>{
    try{
        const {title,desc,userId, username} = req.body
            if (!title || !desc || !userId || !username) {
                return res.status(400).send({
                  success: false,
                  message: "Please Fill all fields",
                });
              }
       const newpost = await PostModel.create({title,desc,userId, username})
       await newpost.save()
        res.status(200).send({
      messgae: "post created successfully",
    });
    }
    catch(err){
          res.status(500).json({err})
    }
}
export const getpost = async(req:any,res:any)=>{
    try{
       const post = await PostModel.findByPk(req.params.id)
       if(post !== null){
           res.status(200).json(post)
       }
       else{
        res.status(404).send({
            success: false,
            message: "Post not found",
          });
       }
    }
    catch(err){
        res.status(500).json(err)
    }
}
export const getallpost = async(req:any,res:any)=>{
    try{
        const post = await PostModel.findAll({})
        if (!post) {
            return res.status(200).json({
              success: false,
              message: "No Blogs Found"
            });
          }
          return res.status(200).json({
            success: true,
            message: "All Blogs lists",
            posts: post
        });
     }
     catch(err){
      res.status(500).send({
          success: false,
          message: "internal server error",
        });
     }
}