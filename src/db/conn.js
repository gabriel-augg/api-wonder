import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config()

const sequelize = new Sequelize("wonder", process.env.SERVER_USERNAME, process.env.SERVER_PASSWORD, {
    host: process.env.SERVER_HOST,
    dialect: "mysql"
})

try {
    await sequelize.authenticate()
    console.log("Connected successfully")
} catch (error) {
    console.log("Failed to connect: ", error)
}

export { sequelize }