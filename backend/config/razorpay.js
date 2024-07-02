import Razorpay from "razorpay";
import {config as configDotenv } from "dotenv";
configDotenv()

export const instance = new Razorpay({
    key_id:process.env.RAZOR_KEY_ID,
    key_secret:process.env.RAZOR_KEY_SECRET,
})