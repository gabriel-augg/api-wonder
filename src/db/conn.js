import { Sequelize } from "sequelize";

const sequelize = new Sequelize("wonder", "root", "$ecret", {
    host: "localhost",
    dialect: "mysql"
})

try {
    await sequelize.authenticate()
    console.log("Connected successfully")
} catch (error) {
    console.log("Failed to connect: ", error)
}

export { sequelize }