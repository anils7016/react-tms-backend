import express from "express";
import {
  getProducts,
  getCustomers,
  insertCustomer,
  updateCustomer,
  getClientAccounts,
  getClientAccountById,
  insertAccount,
  updateAccount
} from "../controllers/client.js";
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

// Define routes testing routes
router.get('/', (req, res) => {
  res.send('Client route');
});

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.post("/insertCustomer", upload.single('profileImage'), insertCustomer);
router.put("/updateCustomer/:id", upload.single('profileImage'), updateCustomer);
//router.put("/updateCustomer/:id", updateCustomer);
//Clientaccount
router.get("/clientaccounts", getClientAccounts);
router.get("/clientaccounts/:id", getClientAccountById);
router.post("/insertAccount", insertAccount);
router.put("/updateAccount/:id", updateAccount);

export default router;