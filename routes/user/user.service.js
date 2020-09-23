import bcrypt from 'bcrypt'
import { validateForm } from '../../utils.js'
import User from '../../db/models/user.js'

export async function registerUser(form) {
    validateForm(form, { email: "string", password: "string", name: "string" })

    form.password = await bcrypt.hash(form.password, 10)

    return User.create(form)
}

export function getAllUsers() {
    return User.findAll()
}