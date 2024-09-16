import User from "../models/user";
import bcrypt from "bcryptjs";

interface UserCreationAttributes {
  username: string;
  email: string;
  password: string;
}

class UserService {
  static async createUser({
    username,
    email,
    password,
  }: UserCreationAttributes): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({
      username,
      email,
      password: hashedPassword,
    });
  }

  static async getUser({
    email,
    id,
  }: {
    email?: string;
    id?: number;
  }): Promise<User | null> {
    if (email) {
      return await User.findOne({ where: { email } });
    } else if (id) {
      return await User.findByPk(id);
    }
    return null;
  }

  static async comparePassword(
    plainPassword: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hash);
  }
}

export default UserService;
