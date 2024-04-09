import { sequelize as db } from "../db/conn.js";
import { Sequelize, DataTypes } from "sequelize";

import User from "./User.js";

const Post = db.define("Post", {
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
    answersCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
})

Post.belongsTo(User)
User.hasMany(Post)

export default Post;