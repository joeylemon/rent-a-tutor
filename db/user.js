import Sequelize from 'sequelize'
import db from './db.js'

/**
 * @swagger
 * 
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Unique id for the user
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The creation time of the user
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The time the user's information was last updated
 *         name:
 *           type: string
 *           description: The user's full name
 *         email:
 *           type: string
 *           format: email
 *           description: Email for the user
 *         phone:
 *           type: string
 *           format: phone
 *           description: Phone number for the user
 *         dob:
 *           type: string
 *           format: date
 *           description: Date of birth for the user
 *       example:
 *          - id: 10324
 *            created_at: '2020-09-22T16:35:31.000Z'
 *            updated_at: '2020-09-22T16:35:31.000Z'
 *            name: 'Joey'
 *            email: 'joey@rentatutor.com'
 *            phone: '5159998523'
 *            dob: '2000-03-24'
 *          - id: 120352
 *            created_at: '2020-09-22T16:35:31.000Z'
 *            updated_at: '2020-09-22T16:35:31.000Z'
 *            name: 'Dustin'
 *            email: 'dustin@rentatutor.com'
 *            phone: '1234567890'
 *            dob: '2000-03-24'
 */
export default class User extends Sequelize.Model { }

User.init({
    id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true
    },
    email: Sequelize.STRING(100),
    name: Sequelize.STRING(100),
    phone: Sequelize.STRING(15),
    dob: Sequelize.DATEONLY
}, {
    sequelize: db,
    tableName: 'user'
})