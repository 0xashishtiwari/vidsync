import express from 'express';
import {createServer} from 'node:http';
import {connectToSocket}  from './controllers/socketManager.js'
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import bodyParser from 'body-parser'

dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port" , (process.env.PORT || 8000))
app.set("mongo_url" , (process.env.MONGO_URL))
app.use(cors());
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({limit:"40kb" ,extended: true}));


app.use('/api/v1/users' , userRoutes);

const start = async ()=>{

    
    server.listen(app.get("port") , ()=>{
        console.log(`LISTENING ON PORT ${app.get("port")}`);
    });
    
    const connectionDb =  await mongoose.connect(app.get("mongo_url"));
    // console.log(connectionDb);
    console.log(`MONGO Connected DB Host : ${connectionDb.connection.host}`);

    
   
}

start();