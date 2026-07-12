import nodemailer from "nodemailer";
import {config as configDotenv } from "dotenv";
configDotenv()

// Escape user-supplied values before interpolating into HTML email bodies
export const escapeHtml = (value) =>
    String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

const mailSender = async (email,title,body) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587, 
            secure: false,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from:"Skill safari",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        return info
        
    } catch (error) {
        console.log(error.message);
    }
}

export default mailSender;