import bcrypt from 'bcrypt'
import { validateForm } from '../../utils.js'
import { BadRequestError } from '../../objects.js'
import User from '../../db/models/user.js'
import Gender from '../../db/models/gender.js'
import Role from '../../db/models/role.js'

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
