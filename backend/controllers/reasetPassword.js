import User from "../models/user.js";
import mailSender from "../utils/mailSender.js";
import bcrypt from 'bcrypt'
import crypto from 'crypto'


export const resetPasswordToken = async (req,res) =>{
    try {
        const email = req.body.email;

        //check the user exist or not
        const user = await User.findOne({email:email});
        if(user){
            //generate token
            const token = crypto.randomBytes(32).toString("hex")
            //update user details
            await User.findOneAndUpdate(
                {email:email},
                {
                    token:token,
                    resetPasswordExpires:Date.now() + 5 * 60 * 60 *1000
                },
                {new:true}
            )

            //create link
            const url = `${process.env.FRONTEND_URL || "http://localhost:3000"}/update-password/${token}`;
            //send mail
            mailSender(email,"Reset password link",`<p>Click <a href="${url}">here</a> to reset your password.</p><p>This link expires in 5 hours.</p>`)
        }

        //same response whether or not the account exists, to prevent user enumeration
        return res.status(200).json({
            success:true,
            message:"If an account exists for this email, a reset link has been sent"
        })
    } catch (error) {
        console.log("Error while ssending reset email link",error);
        return res.status(500).json({
            success:false,
            message:"Reset Email sent unsuccessfully"
        })
    }
}

export const resetPassword = async (req,res) =>{
    try {
        //fetch details
        const {NewPassword,confiemPassword,token} = req.body

        if(!NewPassword || !confiemPassword || !token){
            return res.status(400).json({
                success : false,
                message: "Please fill all the feilds"
            })
        }

        //valiadate the password
        if(NewPassword !== confiemPassword){
            return res.status(400).json({
                success : false,
                message: "Password not matched"
            })
        }

        //get the user details by token

        const userdetails = await User.findOne({token:token})
        if(!userdetails){
            return res.status(401).json({
                success : false,
                message : "token not found"
            })
        }

        //check expires time
        if(userdetails.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success : false,
                message : "Reset link expired"
            })
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(NewPassword,10)

        //update the password and invalidate the token so it cannot be reused
        await User.findOneAndUpdate(
            {token:token},
            {
                password:hashedPassword,
                token:null,
                resetPasswordExpires:null
            },
            {new:true}
        )

        return res.status(200).json({
            success : true,
            message : "Password updated successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Someting went wrong while reseting password"
        })

    }
}
