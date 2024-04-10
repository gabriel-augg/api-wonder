import { sequelize as db } from "../db/conn.js";
import { Sequelize, DataTypes } from "sequelize";

import User from "./User.js";

const Follow = db.define("Follow", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    }
})

Follow.belongsTo(User)
User.hasMany(Follow)

export default Follow;