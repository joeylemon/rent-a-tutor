import Sequelize from 'sequelize'
import db from '../db.js'
import Gender from './gender.js'
import Role from './role.js'

/**
 * @apiDefine UserReturn Return a user object
 * @apiSuccessExample Success Response:
 *   {
 *     "id": 11,
 *     "email": "t@t.com",
 *     "name": "Joey",
 *     "phone": "6159468534",
 *     "dob": "2000-03-24",
 *     "createdAt": "2021-02-16T16:27:21.000Z",
 *     "updatedAt": "2021-02-16T16:27:21.000Z",
 *     "gender": {
 *         "id": 1,
 *         "name": "Male"
 *     },
 *     "role": {
 *         "id": 1,
 *         "name": "Student"
 *     }
 *  }
 */
export default class User extends Sequelize.Model { }

User.init({
    id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true
    },
    email: Sequelize.STRING(100),
    password: Sequelize.CHAR(60),
    name: Sequelize.STRING(100),
    phone: Sequelize.STRING(15),
    dob: Sequelize.DATEONLY,
    city: Sequelize.STRING(20),
    state: Sequelize.STRING(20),
    latitude: Sequelize.FLOAT,
    longitude: Sequelize.FLOAT,
    genderId: Sequelize.INTEGER(10),
    roleId: Sequelize.INTEGER(10)
}, {
    sequelize: db,
    tableName: 'user',
    defaultScope: {
        attributes: { exclude: ['password', 'genderId', 'roleId'] }
    }
})

Gender.hasMany(User, { foreignKey: 'genderId', as: 'gender' })
User.belongsTo(Gender, { foreignKey: 'genderId', as: 'gender' })

Role.hasMany(User, { foreignKey: 'roleId', as: 'role' })
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' })
