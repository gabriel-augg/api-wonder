import { sequelize as db } from "../db/conn.js";
import { Sequelize, DataTypes, and } from "sequelize";

import User from "./User.js";
import Question from "./Question.js";

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
    liked: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
})

Answer.belongsTo(User)
Answer.belongsTo(Question)
User.hasMany(Answer)
Question.hasMany(Answer)

export default Answer;