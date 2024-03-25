import { Sequelize } from "sequelize";

const sequelize = new Sequelize("wonder", "root", "kngJySONnRTlrwyeebURhUqRwddUsKlw", {
    host: "viaduct.proxy.rlwy.net",
    port: 13015,
    dialect: "mysql"
})

try {
    await sequelize.authenticate()
    console.log("Connected successfully")
} catch (error) {
    console.log("Failed to connect: ", error)
}

export { sequelize }