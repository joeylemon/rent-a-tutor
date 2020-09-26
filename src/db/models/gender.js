import Sequelize from 'sequelize'
import db from '../db.js'

export default class Gender extends Sequelize.Model { }

Gender.init({
    id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true
    },
    name: Sequelize.STRING(20)
}, {
    sequelize: db,
    tableName: 'gender',
    timestamps: false
})
