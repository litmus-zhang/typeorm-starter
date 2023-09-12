import { Request, Response, NextFunction } from "express";
import { UserController } from "./UserController";

export class AuthController {
  private userController = new UserController();
  async registerUser(req: Request, res: Response, _next: NextFunction) {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
    } = req.body;
    try {
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Password mismatch" });
      }

      if ((await this.userController.checkIfUserExists(email)) === true) {
        res.status(400).json({ message: "User already exist" });
      }
      await this.userController.save(req, res, _next);
      return res.status(200).json({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      if (email === "" || password === "") {
        return res.status(400).json({ message: "missing required values" });
      }
      if ((await this.userController.checkIfUserExists(email)) === false) {
        return res.status(400).json({ message: "invalid credentials" });
      }
      // compare password with hashed password
      const user = await this.userController.findByEmail(email);
      if (
        (await this.userController.comparePassword(password, user.password)) ===
        false
      ) {
        return res.status(400).json({ message: "invalid credentials" });
      }

      return res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
      console.log(error);
    }
  }
  async logoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.log(error);
    }
  }
}
