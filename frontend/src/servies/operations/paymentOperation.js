import axios from "axios";
import { paymentEndpoints } from "../api";
import { apiConneector } from "../apiConnector";
import toast from "react-hot-toast";

export const order = async (courses,userDetails, navigate) => {
    
    try {
        
        const orderResponse = await apiConneector(
            'post', 
            paymentEndpoints.order, 
            {
                courses : courses, id: userDetails._id
            },
            {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        );

        if(!orderResponse?.data?.success) {
            toast.error(orderResponse?.data?.message);
            throw new Error(orderResponse?.data?.message);
        }
        // console.log(orderResponse);

        const options = {
            key : import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: orderResponse?.data?.payment?.amount,
            currency: "INR",
            order_id: orderResponse.data.payment.id,
            name:"CodeGyaan",
            description: "Thank You for Purchasing the Course",
            // image:rzpLogo,
            prefill: {
                name:userDetails.name,
                email:userDetails.email,
            },
            handler: function(response) {
                //send successful wala mail
                sendPaymentSuccessEmail(response, orderResponse.data.payment.amount,localStorage.getItem("token") );
                //verifyPayment
                verifyPayment({...response, courses, id: userDetails._id}, localStorage.getItem("token"), navigate);
            }
        };
        // console.log(options.key);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response) {
            toast.error("oops, payment failed");
            console.log(response.error);
        })
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || error.message);
    }

}

//send payment success email
async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConneector("POST", paymentEndpoints.sendVerificationMail, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
            id: JSON.parse(localStorage.getItem("user"))._id
        },{
            Authorization: `Bearer ${token}`
        })
    }
    catch(error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
    }
}


//verify payment
async function verifyPayment(bodyData, token, navigate) {
    // console.log("bhqi", bodyData);
    const toastId = toast.loading("Verifying Payment....");
    try{
        const response  = await apiConneector("POST", paymentEndpoints.verifypayment, bodyData, {
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success) {
            throw new Error(response?.data?.message);
        }
        toast.success("payment Successful, you are addded to the course");
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        // console.log("res wala user",response?.data?.user);
        // console.log("local wala user",response?.data?.user);
        navigate("/dashboard/enrolled-courses");

        // dispatch(resetCart());
    }   
    catch(error) {
        console.log("PAYMENT VERIFY ERROR....", error);
        toast.error("Could not verify Payment");
    }
    toast.dismiss(toastId);
    // dispatch(setPaymentLoading(false));
}