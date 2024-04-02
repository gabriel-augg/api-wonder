import { sequelize as db } from "../db/conn.js";
import { Sequelize, DataTypes } from "sequelize";

import User from "./User.js";
import Answer from "./Answer.js";

const LikeAnswer = db.define("LikeAnswer", {
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

LikeAnswer.belongsTo(User)
LikeAnswer.belongsTo(Answer)
User.hasMany(LikeAnswer)
Answer.hasMany(LikeAnswer)


export default LikeAnswer;