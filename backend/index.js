import express from 'express';
import dbconnect from './config/database.js';
import { config as configDotenv } from 'dotenv';
import authRoute from './routes/auth.js';
import userRoute from './routes/userRoute.js';
import instructorRoute from './routes/instructor.js';
import { cloudinaryset } from './config/cloudinary.js';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import studentRoute from './routes/student.js';
import paymentRoute from './routes/payment.js';

configDotenv();
cloudinaryset();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors(
    {
        origin:["http://localhost:5173","https://code-gyaan2.vercel.app"],
        methods:["POST","GET","PUT","DELETE"],
        credentials:true
    }
))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/instructor', instructorRoute);
app.use('/api/v1/student', studentRoute);
app.use('/api/v1/payment',paymentRoute);

app.get('/', (req, res) => {
    res.send("server is running");
});

app.listen(port, () => {
    console.log("server is running at port", port);
    dbconnect();
});
