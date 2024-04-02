import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.SERVER_USERNAME, process.env.SERVER_PASSWORD, {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    dialect: 'mysql'
})

try {
    await sequelize.authenticate()
    console.log("Successfully connected ")
} catch (error) {
    console.log("Failed to connect: ", error)
}

export { sequelize }