import { sequelize as db } from "../db/conn.js";
import { Sequelize, DataTypes } from "sequelize";

import User from "./User.js";
import Post from "./Post.js";
import Answer from "./Answer.js";

const Like = db.define("Like", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    }
})

Like.belongsTo(User)
Like.belongsTo(Post)
Like.belongsTo(Answer)
User.hasMany(Like)
Post.hasMany(Like)
Answer.hasMany(Like)


export default Like;