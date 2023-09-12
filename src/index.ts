import express from "express"
import { AppDataSource } from "./utils/data-source"
import UserRouter from "./router/userRouter"
import cors from "cors"  


// create express app
const app = express()

AppDataSource.initialize().then(async () => {

    app.use(express.json())
    app.use(cors({
        origin: "*"
    }));
    app.use(express.json())
    app.get("/api/v1/status", (req, res)=>{
        res.status(200).json({message: "All System OK"})
    })
    app.use("/api/v1/users", UserRouter);
    

}).catch(error => console.log(error))

export {app};
