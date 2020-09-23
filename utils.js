import jwt from 'jsonwebtoken'
import { RequestError } from './objects.js'
import { JWT_KEY } from './secrets.js'
import User from './db/models/user.js'

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
 * @apiHeader {String} Authorization The user's API token, set like <code>Authorization: Bearer n8tMnthS$V5*8^iyu1HEhX63</code>
 */
export async function authorize(req, res, next) {
    try {
        const header = req.header('Authorization')
        if (!header) return requestError(res, 401, "Authorization header is missing")

        const token = header.replace('Bearer ', '')
        const decoded = jwt.verify(token, JWT_KEY)

        // Find user with token and id
        const user = await User.findOne({ where: { email: decoded.email } })
        if (!user) return requestError(res, 401, "Cannot find user")

        // Save the user and token values in the response object
        res.locals.user = user
        res.locals.token = token

        next()
    } catch (err) {
        return requestError(res, 401, err.toString())
    }
}

/**
 * Send the given error to the given response object
 * @param {Response} res The response object from the http request
 * @param {number} code The HTTP status code
 * @param {string} msg The error message
 */
export function requestError(res, code, msg) {
    const err = new RequestError(code, msg)
    res.status(err.code).send(err)
}

/**
 * Given a list of form value definitions, check to see all values in the form exist and match
 * @param {object} form The req.body object from a request
 * @param {array} defs The array of form value definitions
 * @returns False if the form is valid, an error string otherwise
 * @example
 *     validateForm({a: 1, b: "hello"}, {a: "int", b: "string"})
 */
export function validateForm(form, defs) {
    if (!form)
        throw new Error("form is missing")

    const invalidKey = Object.keys(defs).find(d => !form[d] || typeof form[d] !== defs[d])
    if (invalidKey)
        throw new Error(`${invalidKey} is missing`)
}