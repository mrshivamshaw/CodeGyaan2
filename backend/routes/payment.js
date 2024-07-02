import { Router } from "express";
import { auth, isStudent } from "../middlewares/auth.js";
import { order, sendPaymentSuccessEmail, verifyPayment } from "../controllers/payment.js";

const paymentRoute = Router();

paymentRoute.post('/order',auth,isStudent,order);
paymentRoute.post('/verifypayment',auth,isStudent,verifyPayment);
paymentRoute.post('/sendverificationmail',auth,isStudent, sendPaymentSuccessEmail);

export default paymentRoute