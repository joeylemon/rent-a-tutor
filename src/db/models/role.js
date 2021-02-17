import Sequelize from 'sequelize'
import db from '../db.js'

export default class Role extends Sequelize.Model { }

Role.init({
    id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true
    },
    name: Sequelize.STRING(20)
}, {
    sequelize: db,
    tableName: 'role',
    timestamps: false
})
