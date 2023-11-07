const catchAsyncError= require('../middlewares/catchAsyncError');
const User=require('../models/userModel');
const sendEmail = require('../utils/email');
const  ErrorHandler= require('../utils/errorHandler') ;
const sendToken = require('../utils/jwt');
const crypto=require('crypto');

//regiester user
exports.regiesterUser = catchAsyncError(async (req,res,next) => {
   const {name,email,password} = req.body

   let avatar;
   if(req.file){
      avatar=`${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
   }
  const user = await User.create({
    name,
    email,
    password,
    avatar
   });

   sendToken(user,201,res);

   
})



//  ************************
// login user

exports.loginUser=catchAsyncError(async (req,res,next) => {
   const {email,password}=req.body

   if(!email || !password  )
   {
             return next(new ErrorHandler('please enter the email & password',400))
   }

   //finding the  user in database 
   const user =await User.findOne({email}).select('+password')

   if(!user){
          return next(new ErrorHandler('invalid email & password',401))
     }

     if(!await user.isValidPassword(password)){

         return next(new ErrorHandler('invalid email & password',401))
         }

         sendToken(user,201,res);

})


exports.logoutUser = (req,res,next)=> {
   res.cookie('token',null,{
      expires:new Date(Date.now()),
      httpOnly:true
   })
   .status(200)
   .json({
      success:true,
      message:"Logedout"
   })


}
//*********************************** */

//forgotpassword
// //Forgot Password - /api/v1/password/forgot
exports.forgotPassword = catchAsyncError( async (req, res, next)=>{
   const user =  await User.findOne({email: req.body.email});

   if(!user) {
       return next(new ErrorHandler('User not found with this email', 404))
   }

   const resetToken = user.getResetToken();
   await user.save({validateBeforeSave: false})
   
   
 
   //Create reset url
   const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
 

   const message = `Your password reset url is as follows \n\n 
   ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

   try{
       sendEmail({
           email: user.email,
           subject: "JMadhancart Password Recovery",
           message
       })

       res.status(200).json({
           success: true,
           message: `Email sent to ${user.email}`
       })

   }catch(error){
       user.resetPasswordToken = undefined;
       user.resetPasswordTokenExpire = undefined;
       await user.save({validateBeforeSave: false});
       return next(new ErrorHandler(error.message), 500)
   }

})  
//resetpassword
exports.resetPassword = catchAsyncError( async (req, res, next) => {
   
   const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex'); 

    const user = await User.findOne( {
        resetPasswordToken,
        resetPasswordTokenExpire: {
            $gt : Date.now()
        }
    } )
    if(!user) {
        return next(new ErrorHandler('Password reset token is invalid or expired'));
    }

    if( req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match'));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave: false})
    sendToken(user, 201, res)

})



//get user profile-{{base_url}}/api/v1/myprofile
exports.getUserProfile=catchAsyncError(async (req,res,next) =>{
   const user=await User.findById(req.user.id)
   res.status(200).json({
      success:true,
      user
   })
})
//change password--/api/v1/password/change
exports.changePassword = catchAsyncError(async (req,res,next)=>{
   const user=await User.findById(req.user.id).select('+password');

   //check old password
   if(!await user.isValidPassword(req.body.oldPassword)){
      return next(new ErrorHandler('oldpassword is incorrect',401))
   }

   //assingning new password
   user.password=req.body.password;
   await user.save();
   res.status(200).json({
      success:true
      
   })
})

// //update profile
exports.updateProfile=catchAsyncError(async (req,res,next)=>{
   let newUserData={
      name :req.body.name,
      email:req.body.email
   }
   let avatar;
   if(req.file){
      avatar=`${process.env.BACKEND_URL}/uploads/user/${req.file.originalname}`
      newUserData={...newUserData,avatar}
   }

 const user=await  User.findByIdAndUpdate(req.user.id,newUserData,{
      new:true,
      runValidators:true,

   })
   res.status(200).json({
      success:true,
      user
   })
})
//Admin : get all user ={{base_url}}/api/v1/admin/users
exports.getAllUsers=catchAsyncError(async (req,res,next) => {
   const users=await User.find();
   res.status(200).json({
      success:true,
      users
   })
})
//admin : get specific user={{base_url}}/api/v1/admin/user/id
exports.getUser=catchAsyncError(async (req,res,next) => {
   const user=await User.findById(req.params.id);

   if(!user){
      return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
   }
   res.status(200).json({
      success:true,
      user
   })
})
//admin : update  user={{base_url}}/api/v1/admin/user/id
// exports.updateUser=catchAsyncError(async (req,res,next) => {
//    const newUserData={
//       name :req.body.name,
//       email:req.body.email,
//       role:req.body.role
//    }

//  const user=await  User.findByIdAndUpdate(req.params.id,newUserData,{
//       new:true,
//       runValidators:true,

//    })
//    res.status(200).json({
//       success:true,
//       user
//    })
// })

exports.updateUser = catchAsyncError(async (req, res, next) => {
   const newUserData = {
     name: req.body.name,
     email: req.body.email,
     role: req.body.role,
   };
 
   try {
     const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
       new: true,
       runValidators: true,
     });
 
     if (!user) {
       return res.status(404).json({
         success: false,
         message: 'User not found',
       });
     }
 
     res.status(200).json({
       success: true,
       user,
     });
   } catch (error) {
     console.error(error);
     res.status(500).json({
       success: false,
       message: 'Internal Server Error',
     });
   }
 });
 
//Admin : delete user
exports.deleteUser=catchAsyncError(async (req,res,next) => {
   const user=await User.findById(req.params.id);
   
   if(!user){
      return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
   }
   await user.deleteOne();
   res.status(200).json({
      success:true
      
   })
})