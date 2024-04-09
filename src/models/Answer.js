import { sequelize as db } from "../db/conn.js";
import { Sequelize, DataTypes, and } from "sequelize";

import User from "./User.js";
import Post from "./Post.js";

const Answer = db.define("Answer", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
})

Answer.belongsTo(User)
Answer.belongsTo(Post)
User.hasMany(Answer)
Post.hasMany(Answer)

export default Answer;