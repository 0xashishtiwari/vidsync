import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import crypto from 'node:crypto';

const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please provide the input field's" });
  }

  
  try {
      
    const dbUser = await User.findOne({ username });
    if(!dbUser){
      return  res.status(httpStatus.NOT_FOUND).json({message : "User doesn't exists"})
    }

    let isMatch = await bcrypt.compare(password  , dbUser.password);
      if(isMatch){
        let token = crypto.randomBytes(20).toString('hex');

        dbUser.token = token;
       
        await dbUser.save();
        return res.status(httpStatus.OK).json({message : "Login successfull", token : token} );
     }
       return res.status(httpStatus.UNAUTHORIZED).json({message : "Wrong password entered"});
     



  } catch (error) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message : `Something went wrong ${error}`})
  }
};

const register = async (req, res) => {
  
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ message: "Please provide the input field's" });
  }

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


export  {login , register};