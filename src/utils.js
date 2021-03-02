import emailValidator from 'email-validator'
import { BadRequestError } from './objects.js'

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
