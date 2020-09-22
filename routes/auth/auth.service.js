import jwt from 'jsonwebtoken'

import { Token } from '../../objects.js'
import { JWT_KEY } from '../../secrets.js'

export function getAPIToken(email) {
    const expireTime = 2592000
    const token = jwt.sign({ email: req.body.email }, JWT_KEY, {
        algorithm: "HS256",
        expiresIn: expireTime,
    })

    return new Token(token, Date.now() + expireTime)
}
