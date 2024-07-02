import { Router } from "express";
import { auth, isStudent } from "../middlewares/auth";
import { order, verifyPayment } from "../controllers/payment";

const paymentRoute = Router();

paymentRoute.post('/order',auth,isStudent,order);
paymentRoute.post('/verifypayment',auth,isStudent,verifyPayment);
// paymentRoute.post('/sendverificationmail',auth,isStudent, verificationMail);

export default paymentRoute