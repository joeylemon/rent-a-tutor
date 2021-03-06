import crypto from 'crypto'
import emailValidator from 'email-validator'
import { BadRequestError } from './objects.js'

/**
 * Generate a random string with the given length
 * @param {number} len The length of the resulting string
 * @example
 *     randString(30) => "be38cbbc30063121815a8148a8276e"
 */
export function randString (len) {
    return crypto.randomBytes(Math.floor(len / 2)).toString('hex')
}

/**
 * Extract the useful information from a request object
 * @param {Request} req The request object
 * @example
 *     logger.child({ request: getRequestInformation(req) }).info()
 */
export function getRequestInformation (req) {
    if (req.body.password) delete req.body.password
    return { path: req.url, method: req.method, body: req.body, src: req.headers['x-forwarded-for'], agent: req.headers['user-agent'] }
}

/**
 * Given a list of form value keys, check to see all values in the form exist.
 * If not, throw an error describing the invalid data
 * @param {object} form The req.body object from a request
 * @param {array} defs The array of values that should be in the form
 * @example
 *     validateForm({a: 1, b: "hello"}, ["a", "b"])
 */
export function validateForm (form, defs) {
    if (!form) { throw new BadRequestError('form is missing') }

    // Ensure all given definitions are included in the form
    const invalidKey = defs.find(d => !form[d])
    if (invalidKey) { throw new BadRequestError(`${invalidKey} is missing`) }

    // Validate emails
    if (form.email && !emailValidator.validate(form.email)) { throw new BadRequestError('email is invalid') }

    // Validate passwords
    if (form.password) {
        if (form.password.length < 8) { throw new BadRequestError('password is too short') } else if (form.password.length > 70) { throw new BadRequestError('password is too long') }
    }

    if (form.phone && !/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(form.phone)) { throw new BadRequestError('phone number is invalid') }
}
