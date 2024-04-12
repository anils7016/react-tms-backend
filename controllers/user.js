import User from "../models/User.js";


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

    // Perform validation if needed
    const postAccount = await User.create({
      fname,
      lname,
      email,
      password
    });
    // Send a success response with the inserted postAccount data
    res.status(201).json(postAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
