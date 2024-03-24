import { sequelize as db } from "../db/conn.js";
import { Sequelize, DataTypes } from "sequelize";

import User from "./User.js";
import Question from "./Question.js";

const Like = db.define("Like", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    }
})

Like.belongsTo(User)
Like.belongsTo(Question)
User.hasMany(Like)
Question.hasMany(Like)


export default Like;