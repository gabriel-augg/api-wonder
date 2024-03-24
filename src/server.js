import express from "express"
import { sequelize as conn } from "./db/conn.js";

import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import likedQuestionRoutes from "./routes/likedQuestionRoutes.js";

const port = 3000
const app = express()

app.use(express.json())

app.use("/users", userRoutes)
app.use("/questions", questionRoutes)
app.use("/likedquestion", likedQuestionRoutes)


conn.sync().then(()=> {
    app.listen(port)
}).catch((error) => {
    console.log(error)
})



