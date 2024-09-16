import { Request, Response } from "express";
import UserService from "../services/userService";
import jwt from "jsonwebtoken";
import DataService from "../services/dataService";
import { RETURN_CODE } from "../common/returnCode";

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await UserService.createUser({ username, email, password });
    res.status(RETURN_CODE.CREATED).json({
      message: "User created successfully",
      success: true,
      data: { user: newUser },
    });
  } catch (error) {
    res
      .status(RETURN_CODE.INTERNAL_SERVER)
      .json({ message: "Error creating user", success: false, error });
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;


  try {
    const user = await UserService.getUser({ email });
    if (!user) {
      return res
        .status(RETURN_CODE.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // Compare the password
    const isPasswordValid = await UserService.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res
        .status(RETURN_CODE.UNAUTHORIZED)
        .json({ message: "Invalid password" });
    }

    const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "24h" } // Token expires in 24 hour
    );
    res.status(RETURN_CODE.SUCCESS).json({
      message: "Login successful",
      success: true,
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    console.error("error--:", error);
    res
      .status(RETURN_CODE.INTERNAL_SERVER)
      .json({ message: "Error logging in", success: false, error });
  }
};

export const getProfileData = async (req: Request, res: Response) => {
  try {
    const userQuery = UserService.getUser({ email: req?.user?.email });
    const telegramDataQuery = DataService.getAllData(20);
    const [user, telegramData] = await Promise.all([
      userQuery,
      telegramDataQuery,
    ]);
    res.status(RETURN_CODE.SUCCESS).json({
      message: "User created successfully",
      success: true,
      data: { user, telegramData },
    });
  } catch (error) {
    res
      .status(RETURN_CODE.INTERNAL_SERVER)
      .json({ message: "Error creating user", success: false, error });
  }
};
