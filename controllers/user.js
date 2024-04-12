import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
    const id = req.params();
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const signUp = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    // Perform validation if needed
    const postLogin = await User.create({
      fname,
      lname,
      email,
      password: hashedPassword
    });
    // Send a success response with the inserted postLogin data
    res.status(201).json(postLogin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  const {email, password} = req.body;
  try{
    const userData = await User.findOne({email})
    console.log('userData', userData)
    if(!userData){
      res.status(401).json({message: "Invalid email or password"})
    }

    const passwordMatch = await bcrypt.compare(password, userData.password)
    if(!passwordMatch){
      res.status(401).json({message: "Invalid email or password"})
    }

    //res.status(200).json({data: userData}, {message: "Successfully login"})
    const token = jwt.sign({email: userData.email}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"})
    res.status(200).json({data:userData, token} );
  }catch(error){
    res.status(500).json({message: error.message})
  }

}