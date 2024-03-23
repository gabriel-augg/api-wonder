import { sequelize as db } from "../db/conn.js";
import { Sequelize, DataTypes } from "sequelize";

const User = db.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default User;