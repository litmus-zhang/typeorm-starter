import { Router } from "express";
import { AuthController } from "../controller/AuthController";

const UserRouter = Router();
const authController = new AuthController();

UserRouter.post('/register',
    (req, res, next) => authController.registerUser(req, res, next));

UserRouter.post("/login", (req, res, next) => authController.loginUser(req, res, next));


export default UserRouter;