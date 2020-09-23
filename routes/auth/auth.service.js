import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../../db/models/user.js'
import { Token } from '../../objects.js'
import { JWT_KEY } from '../../secrets.js'
import { validateForm } from '../../utils.js'

export function getAPIToken(email) {
    const expireTime = 2000
    const token = jwt.sign({ email: email }, JWT_KEY, {
        algorithm: "HS256",
        expiresIn: expireTime,
    })

    return new Token(token, Date.now() + expireTime)
}

export async function login(form) {
    validateForm(form, ["email", "password"])

    const user = await User.findOne({
        attributes: ["password"],
        where: { email: form.email }
    })
    if (!user)
        throw new Error("invalid login information")

    const same = await bcrypt.compare(form.password, user.password)
    if (!same)
        throw new Error("invalid login information")

    return getAPIToken(form.email)
}