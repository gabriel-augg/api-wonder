import { sequelize as db } from "../db/conn.js";
import { Sequelize, DataTypes } from "sequelize";

import User from "./User.js";
import Post from "./Post.js";

const Like = db.define("Like", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

Like.belongsTo(User)
Like.belongsTo(Post)
User.hasMany(Like)
Post.hasMany(Like)


export default Like;