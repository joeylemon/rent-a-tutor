import bcrypt from 'bcrypt'
import { validateForm } from '../../utils.js'
import { BadRequestError } from '../../objects.js'
import User from '../../db/models/user.js'
import Gender from '../../db/models/gender.js'
import Role from '../../db/models/role.js'
import db from '../../db/db.js'

export async function registerUser (form) {
    validateForm(form, ['email', 'password', 'name', 'city', 'state', 'phone', 'dob', 'genderId', 'roleId'])

    const existingUser = await getUserByEmail(form.email)
    if (existingUser) { throw new BadRequestError('email already exists') }

    form.password = await bcrypt.hash(form.password, 10)

    return User.create(form)
}

export function getUserByID (id) {
    return User.findOne({
        include: [{
            model: Gender,
            as: 'gender'
        }, {
            model: Role,
            as: 'role'
        }],
        where: { id: id }
    })
}

export function getUserByEmail (email) {
    return User.findOne({
        include: [{
            model: Gender,
            as: 'gender'
        }, {
            model: Role,
            as: 'role'
        }],
        where: { email: email }
    })
}

export function getNearbyTutors (me, distance) {
    return db.query('select u.id, u.name, u.city, u.state, u.dob, g.name as gender, r.name as role, ST_Distance_Sphere(POINT(?, ?), u.location) * .000621371192 as distance from user u left join gender g on g.id = u.genderId left join role r on r.id = u.roleId where u.roleId = 2 having distance <= ? order by distance asc', {
        model: User,
        mapToModel: true,
        replacements: [me.location.coordinates[0], me.location.coordinates[1], distance]
    })
}
