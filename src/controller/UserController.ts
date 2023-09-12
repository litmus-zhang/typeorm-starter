import { AppDataSource } from "../utils/data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import bcrypt from "bcrypt"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }
    async findByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
      }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, email, phoneNumber, password } = request.body;

        // hash password
        const hashedPassword = await this.hashPassword(password);
        const user = Object.assign(new User(), {
            firstName,
            lastName,
            email,
            phoneNumber,
            password : hashedPassword
        })

        return this.userRepository.save(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

    async  checkIfUserExists(email: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { email } });
        return !!user; // Returns true if a user with the given email exists, otherwise false
      }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
      }
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
     
}