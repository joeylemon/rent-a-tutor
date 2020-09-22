import { invalidForm } from '../../utils.js'
import User from '../../db/models/user.js'

export function registerUser(form) {
    const invalid = invalidForm(req.body, { email: "string", password: "string", name: "string", phone: "string", dob: "string" })
    if (invalid)
        throw new Error(invalid)

    return User.create({ email: form.email, name: form.name, phone: form.phone, dob: form.dob })
}

export function getAllUsers() {
    return User.findAll()
}