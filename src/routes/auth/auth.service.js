import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../../db/models/user.js'
import { Token, UnauthorizedError } from '../../objects.js'
import { API_TOKEN_EXPIRE_TIME } from '../../constants.js'
import { JWT_KEY } from '../../secrets.js'
import { validateForm } from '../../utils.js'

export function getAPIToken (user) {
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_KEY, {
        algorithm: 'HS256',
        expiresIn: API_TOKEN_EXPIRE_TIME
    })

    return new Token(token, Date.now() + (API_TOKEN_EXPIRE_TIME * 1000))
}

export async function login (form) {
    validateForm(form, ['email', 'password'])

    const user = await User.findOne({
        attributes: ['id', 'email', 'password'],
        where: { email: form.email }
    })
    if (!user) { throw new UnauthorizedError('invalid login information') }

    const same = await bcrypt.compare(form.password, user.password)
    if (!same) { throw new UnauthorizedError('invalid login information') }

    return getAPIToken(user)
}
