import Sequelize from 'sequelize'
import db from '../db.js'

/**
 * @apiDefine UserListReturn Return a list of user objects
 * @apiSuccess {User[]} _ List of users
 * @apiSuccess {Number}   _.id The user's unique id number
 * @apiSuccess {String}   _.email The user's email
 * @apiSuccess {String}   _.password The user's password
 * @apiSuccess {String}   _.name The user's full name
 * @apiSuccess {String}   [_.phone] The user's phone number
 * @apiSuccess {String}   [_.dob] The user's date of birth
 * @apiSuccessExample Success Response:
 *     [{
 *       "id": 1,
 *       "email": "joeyclemon@gmail.com",
 *       "password": "$2b$10$De765bJQ6XJV7CgloIxGkOfpetjiDzsbfcWkApas1Ez3DsjHkGJ5S",
 *       "name": "Joey Lemon",
 *       "phone": "6159468534"
 *     }]
 */
/**
 * @apiDefine UserReturn Return a user object
 * @apiSuccess {Number} id The user's unique id number
 * @apiSuccess {String} email The user's email
 * @apiSuccess {String} password The user's password
 * @apiSuccess {String} name The user's full name
 * @apiSuccess {String} [phone] The user's phone number
 * @apiSuccess {String} [dob] The user's date of birth
 * @apiSuccessExample Success Response:
 *     {
 *       "id": 1,
 *       "email": "joeyclemon@gmail.com",
 *       "password": "$2b$10$De765bJQ6XJV7CgloIxGkOfpetjiDzsbfcWkApas1Ez3DsjHkGJ5S",
 *       "name": "Joey Lemon",
 *       "phone": "6159468534"
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
    dob: Sequelize.DATEONLY
}, {
    sequelize: db,
    tableName: 'user'
})