import User from "../model/user.js";
import generateToken from "../generateToken.js";

export const register = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "User already registered" });
    }

    const newUser = await User.create({
      userName,
      email,
      password,
    });

    res.status(200).json({
      id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      token: generateToken(newUser._id, newUser.email),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const exist = await User.findOne({ email });
    if (!exist) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await exist.matchPassword(password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      id: exist._id,
      userName: exist.userName,
      email: exist.email,
      token: generateToken(exist._id, exist.email),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
