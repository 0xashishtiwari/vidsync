import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const server = createServer(app);

app.get('/' , (req ,res)=>{
    res.send("working")
})

app.listen(3000 , ()=>{
    console.log('working');
});