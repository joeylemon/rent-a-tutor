import Sequelize from 'sequelize'
import { dirs } from '../../utils/constants.js'
import { BadRequestError } from '../../utils/errors.js'
import db from '../db.js'
import Gender from './gender.js'
import Role from './role.js'

/**
 * @apiDefine UserReturn Return a user object
 * @apiSuccessExample Success Response:
 * {
 *     "id": 11,
 *     "email": "t@t.com",
 *     "name": "Joey",
 *     "phone": "6159468534",
 *     "dob": "2000-03-24",
 *     "city": "Knoxville",
 *     "state": "TN",
 *     "location": {
 *         "type": "Point",
 *         "coordinates": [
 *             35.9116543,
 *             -84.0866346
 *         ]
 *     },
 *     "avatar": "https://jlemon.org/rat/api/v1/user/profile/11/avatar",
 *     "createdAt": "2021-02-16T16:27:21.000Z",
 *     "updatedAt": "2021-03-04T21:28:26.000Z",
 *     "gender": {
 *         "id": 1,
 *         "name": "Male"
 *     },
 *     "role": {
 *         "id": 2,
 *         "name": "Tutor"
 *     }
 * }
 */
export default class User extends Sequelize.Model {
    getAvatarFilepath () {
        if (!this.avatar) return

        return `${dirs.uploads}/${this.avatar}`
    }

    getAvatarURL () {
        return `/user/profile/${this.id}/avatar`
    }

    setLatitude (lat) {
        const latitude = parseFloat(lat)
        if (isNaN(latitude)) { throw new BadRequestError(`${lat} is not a valid latitude value`) }

        this.location = { type: 'Point', coordinates: [latitude, this.location.coordinates[1]] }
    }

    setLongitude (long) {
        const longitude = parseFloat(long)
        if (isNaN(longitude)) { throw new BadRequestError(`${long} is not a valid longitude value`) }

        this.location = { type: 'Point', coordinates: [this.location.coordinates[0], longitude] }
    }
}

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
    location: Sequelize.GEOMETRY('POINT'),
    genderId: Sequelize.INTEGER(10),
    roleId: Sequelize.INTEGER(10),
    avatar: Sequelize.STRING(64)
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
