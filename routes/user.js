import express from "express";
import {  signUp } from "../controllers/user.js";
import multer from 'multer';

// Create a router
const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + '-' + file.originalname )
  }

})
//const upload = multer({ dest: 'uploads/' }); // Configure multer to store files in 'uploads/' directory
const upload = multer({ storage: storage }); // Configure multer to store files in 'uploads/' directory


//router.get("/products", getProducts);
//router.get("/customers", getCustomers);

router.post("/signup", signUp);

//router.post("/sendemail", sendEmailFn);


export default router;