import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import crypto from 'node:crypto';
const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please provide" });
  }

  
  try {
      
    const dbUser = await User.findOne({ username });
    if(!dbUser){
        res.status(httpStatus.NOT_FOUND).json({message : "User doesn't exists"})
    }
   if(bcrypt.compare(password  , dbUser.password)){
        let token = crypto.randomBytes(20).toString('hex');

        dbUser.token = token;
        await dbUser.save();
        return res.status(httpStatus.OK).json({token : token} );
   }

  } catch (error) {}
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

 

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exists" });
    }

    const saltRound = 12;
    const hashedPassword = await bcrypt.hash(password, saltRound);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(httpStatus.CREATED).json({ message: "New user registered" });
  } catch (error) {
    res.json({ message: `Something went wrong ${error}` });
  }
};
