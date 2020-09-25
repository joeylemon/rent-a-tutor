import bcrypt from 'bcrypt'
import { validateForm } from '../../utils.js'
import User from '../../db/models/user.js'

export async function registerUser (form) {
    validateForm(form, ['email', 'password', 'name'])

    form.password = await bcrypt.hash(form.password, 10)

    return User.create(form)
}

export function getAllUsers () {
    return User.findAll()
}

export function getUserByID (id) {
    return User.findOne({ where: { id: id } })
}

export function getUserByEmail (email) {
    return User.findOne({ where: { email: email } })
}
