import { RequestHandler } from "express";
import bcrypt from "bcrypt"
import { UserModel } from "../Model/User";
export const signup:RequestHandler = async(req:any,res:any,next:any)=>{
    try{
    const {username,email,password} =req.body;
    if (!username || !email || !password) {
        return res.status(400).send({
          success: false,
          message: "Please Fill all fields",
        });
      }

      //existing user
      const exisitingUser = await UserModel.findOne({ where: { email: email }});
      if (exisitingUser) {
        return res.status(401).send({
          success: false,
          message: "user already exisits",
        });
}
const hashedPassword = await bcrypt.hash(password, 10);
const user = await UserModel.create({username,email,password:hashedPassword})
// const user = new UserModel({username,email,password:hashedPassword})
await user.save();
return res.status(201).send({
    success: true,
    message: "New User Created",
    user,
  })
}
 catch(err){
    console.log(err)
    return res.status(500).send({
        message: "Error In Register callback",
        success: false,
        err,
      });
}
}
export const loginController:RequestHandler = async(req,res)=>{
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await UserModel.findOne({ where:{ email:req.body.email }});
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not registerd",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invlid username or password",
      });
    }
    return res.status(200).send({
      success:true,
      message:"succesfully login"
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Login Callcback",
      error,
    });
  }
}