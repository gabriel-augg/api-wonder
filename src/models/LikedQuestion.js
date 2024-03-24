import { sequelize as db } from "../db/conn.js";
import { Sequelize, DataTypes } from "sequelize";

import User from "./User.js";
import Question from "./Question.js";

const LikedQuestion = db.define("LikedQuestion", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    }
})

LikedQuestion.belongsTo(User)
LikedQuestion.belongsTo(Question)
User.hasMany(LikedQuestion)
Question.hasMany(LikedQuestion)


export default LikedQuestion;