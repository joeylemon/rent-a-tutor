import Sequelize from 'sequelize'
import db from '../db.js'
import Gender from './gender.js'

/**
 * @apiDefine UserReturn Return a user object
 * @apiSuccess {Number} id The user's unique id number
 * @apiSuccess {String} email The user's email
 * @apiSuccess {String} password The user's password
 * @apiSuccess {String} name The user's full name
 * @apiSuccess {String} [phone] The user's phone number
 * @apiSuccess {String} [dob] The user's date of birth
 * @apiSuccess {Number} [genderId] The user's gender id
 * @apiSuccess {Gender} [gender] The user's gender object
 * @apiSuccess {Number} [gender.id] The user's gender id
 * @apiSuccess {String} [gender.name] The user's gender
 * @apiSuccessExample Success Response:
 *     {
 *       "id": 1,
 *       "email": "joeyclemon@gmail.com",
 *       "name": "Joey Lemon",
 *       "phone": "6159468534",
 *       "genderId": 1,
 *       "gender": {
 *         "id": 1,
 *         "name": "Male"
 *       }
 *     }
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
    genderId: Sequelize.INTEGER(10)
}, {
    sequelize: db,
    tableName: 'user',
    defaultScope: {
        attributes: { exclude: ['password'] }
    }
})

Gender.hasMany(User, { foreignKey: 'genderId' })
User.belongsTo(Gender, { foreignKey: 'genderId' })
