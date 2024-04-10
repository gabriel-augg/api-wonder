import { sequelize as db } from "../db/conn.js";
import { Sequelize, DataTypes } from "sequelize";

const User = db.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
    },
    description: DataTypes.STRING(150),
    photo_url: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    followsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    postsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    likesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default User;