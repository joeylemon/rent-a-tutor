import crypto from 'crypto'
import { BadRequestError } from './errors.js'

const regexPatterns = {
    // eslint-disable-next-line
    email: /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/,
    // eslint-disable-next-line
    phone: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/
}

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
 * Check if the given email is valid
 * @param {String} email The email to validate
 * @example
 *     validateEmail("a@b") => false
 *     validateEmail("t@t.com") => true
 */
function validateEmail (email) {
    if (!email) { return false }

    if (email.length > 254) { return false }

    var valid = regexPatterns.email.test(email)
    if (!valid) { return false }

    // Further checking of some things regex can't handle
    var parts = email.split('@')
    if (parts[0].length > 64) { return false }

    var domainParts = parts[1].split('.')
    if (domainParts.some(function (part) { return part.length > 63 })) { return false }

    return true
}

/**
 * Given a list of form value keys, check to see all values in the form exist.
 * If not, throw an error describing the invalid data
 * @param {object} form The req.body object from a request
 * @param {array} defs The array of values that should be in the form
 * @param {boolean} allowMissing Should we not throw an error if one of the definitions is missing?
 * @example
 *     validateForm({a: 1, b: "hello"}, ["a", "b"])
 */
export function validateForm (form, defs, allowMissing = false) {
    if (!form) { throw new BadRequestError('form is missing') }

    // Ensure all given definitions are included in the form
    if (!allowMissing) {
        const invalidKey = defs.find(d => !form[d])
        if (invalidKey) { throw new BadRequestError(`${invalidKey} is missing`) }
    }

    // Validate emails
    if (form.email && !validateEmail(form.email)) { throw new BadRequestError('email is invalid') }

    // Validate passwords
    if (form.password) {
        if (form.password.length < 8) { throw new BadRequestError('password is too short') } else if (form.password.length > 70) { throw new BadRequestError('password is too long') }
    }

    if (form.phone && !regexPatterns.phone.test(form.phone)) { throw new BadRequestError('phone number is invalid') }
}
