import Product from "../models/Product.js";
import User from "../models/User.js";
import Clientaccount from "../models/Clientaccount.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log("products", products);
    res.status(200).json(products);
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find().sort({ createdAt: -1 });
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const insertCustomer = async (req, res) => {
  console.log("req", req);
  try {
    const { name, email, password } = req.body;
    let profileImage;
    if (req.file) {
      profileImage = {
        filename: req.file.filename,
        contentType: req.file.mimetype,
        data: req.file.buffer,
      };
    }
    // Perform validation if needed
    const customer = await User.create({ name, email, password, profileImage });
    // Send a success response with the inserted customer data
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  console.log("req", req);
  const { id } = req.params;
  const { name, email, password } = req.body;

  let profileImage;
  if (req.file) {
    profileImage = {
      filename: req.file.filename,
      contentType: req.file.mimetype,
      data: req.file.buffer,
    };
  }

  try {
    // Perform any validation here

    // Find the user by ID and update the details
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password, profileImage },
      { new: true }
    );

    if (!updatedUser) {
      // If the user with the provided ID is not found, return a 404 error
      return res.status(404).json({ message: "User not found" });
    }

    // Return the updated user
    res.json(updatedUser);
  } catch (error) {
    // Handle any errors
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ClientAccount
export const getClientAccounts = async (req, res) => {
  try {
    const account = await Clientaccount.find().sort({ createdAt: -1 });
    res.status(200).json(account);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getClientAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Clientaccount.findById(id);
    res.status(200).json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const insertAccount = async (req, res) => {
  try {
    const { accountName, vWebsite, notes } = req.body;

    // Perform validation if needed
    const postAccount = await Clientaccount.create({
      accountName,
      vWebsite,
      notes,
    });
    // Send a success response with the inserted postAccount data
    res.status(201).json(postAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateAccount = async (req, res) => {
  const { id } = req.params;
  const { accountName, vWebsite, notes } = req.body;
  try {
    // Find the user by ID and update the details
    const updatedAccount = await Clientaccount.findByIdAndUpdate(
      id,
      { accountName, vWebsite, notes },
      { new: true }
    );
    if (!updatedAccount) {
      // If the user with the provided ID is not found, return a 404 error
      return res.status(404).json({ message: "User not found" });
    }
    // Return the updated user
    res.json(updatedAccount);
  } catch (error) {
    // Handle any errors
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
