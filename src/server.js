import express from "express"
import cors from 'cors'
import { connectToDatabase } from "./db/conn.js";

import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import followRoutes from "./routes/followRoutes.js"
import answerRoutes from "./routes/answerRoutes.js";
import authRoutes from "./routes/authRoutes.js";


const port = process.env.PORT || 3000
const app = express()

app.use(cors({ credentials: true, origin: "https://wonder-br.vercel.app/"}))

app.use(express.json())

app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)
app.use("/answers", answerRoutes)
app.use("/likes", likeRoutes)
app.use("/follows", followRoutes)


connectToDatabase()
.then(()=>{
    app.listen(port)
})
.catch((error) => {
    console.log(error)
})



