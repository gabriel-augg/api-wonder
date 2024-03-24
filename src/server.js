import express from "express"
import { sequelize as conn } from "./db/conn.js";

import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import answerRoutes from "./routes/answerRoutes.js";

const port = 3000
const app = express()

app.use(express.json())

app.use("/users", userRoutes)
app.use("/questions", questionRoutes)
app.use("/answers", answerRoutes)
app.use("/like", likeRoutes)


conn.sync().then(()=> {
    app.listen(port)
}).catch((error) => {
    console.log(error)
})



