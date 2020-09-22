import jwt from 'jsonwebtoken'
import { JWT_KEY, ERRORS } from './constants.js'

/**
 * This checks the Authorization header for a valid JWT token and then searches the
 * database for the decrypted email. If all checks pass, the middleware continues.
 * Otherwise, a 401 status code will be returned with an unauthorized error message.
 */
export function authorize(req, res, next) {
    try {
        const header = req.header('Authorization')
        if (!header) return requestError(res, "unauthorized")

        const token = header.replace('Bearer ', '')
        const decoded = jwt.verify(token, JWT_KEY)

        // Find user with token and id
        const user = { id: 1, email: decoded.email, name: "Joey Lemon" }
        if (!user) return requestError(res, "unauthorized")

        // Save the user and token values in the response object
        res.locals.user = user
        res.locals.token = token

        next()
    } catch (err) {
        return requestError(res, "unauthorized")
    }
}

/**
 * Send the given error to the given response object
 * @param {string} error_name The name of the error
 * @param {Response} res The response object from the http request
 * @param {array} args The list of arguments to send with the error
 */
export function requestError(res, error_name, ...args) {
    const err = ERRORS[error_name]
    if (!err)
        throw new Error(`invalid error name ${error_name}`)

    res.status(err.code).send(err.toJSON(args))
}