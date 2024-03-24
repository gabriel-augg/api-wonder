import { sequelize as db } from "../db/conn.js";
import { Sequelize, DataTypes } from "sequelize";

import User from "./User.js";

const Question = db.define("Question", {
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
    },
    answer_qty: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
})

Question.belongsTo(User)
User.hasMany(Question)

export default Question;