import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../../db/models/user.js'
import { Token, UnauthorizedError, BadRequestError } from '../../utils/objects.js'
import { API_TOKEN_EXPIRE_TIME } from '../../utils/constants.js'
import { JWT_KEY } from '../../utils/secrets.js'
import { validateForm } from '../../utils/utils.js'

/**
 * This checks the Authorization header for a valid JWT token and then searches the
 * database for the decrypted email. If all checks pass, the middleware continues.
 * Otherwise, a 401 status code will be returned with an unauthorized error message.
 *
 * @apiDefine Token The Authorization header must be set
 * The Authorization header must be set with a valid API token. For example:
 *
 * <code>Authorization: Bearer n8tMnthS$V5*8^iyu1HEhX63</code>
 */
/**
 * @apiDefine Header Request Headers
 * @apiHeader {String} Authorization The user's API token, set like <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...</code>
 */
export async function authorize (req, res, next) {
    try {
        const header = req.header('Authorization')
        if (!header) { return next(new BadRequestError('authorization header is missing')) }

        const token = header.replace('Bearer ', '')
        const decoded = jwt.verify(token, JWT_KEY)

        // Find user with token and id
        const user = await User.findOne({ where: { id: decoded.id } })
        if (!user) { return next(new UnauthorizedError('user does not exist in database')) }

        // Save the user and token values in the response object
        res.locals.user = user
        res.locals.token = token

        next()
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) { return next(new UnauthorizedError(err.toString())) }
        next(err)
    }
}

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
