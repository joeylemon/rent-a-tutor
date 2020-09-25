import jwt from 'jsonwebtoken'
import emailValidator from 'email-validator'
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
 * @apiHeader {String} Authorization The user's API token, set like <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn...</code>
 */
export async function authorize (req, res, next) {
  try {
    const header = req.header('Authorization')
    if (!header) return reqErr(res, 401, 'Authorization header is missing')

    const token = header.replace('Bearer ', '')
    const decoded = jwt.verify(token, JWT_KEY)

    // Find user with token and id
    const user = await User.findOne({ where: { email: decoded.email } })
    if (!user) return reqErr(res, 401, 'Cannot find user')

    // Save the user and token values in the response object
    res.locals.user = user
    res.locals.token = token

    next()
  } catch (err) {
    return reqErr(res, 401, err)
  }
}

/**
 * Send the given error to the given response object
 * @param {Response} res The response object from the http request
 * @param {number} code The HTTP status code
 * @param {string} msg The error message
 */
export function reqErr (res, code, msg) {
  if (msg instanceof Error) msg = msg.toString()
  const err = new RequestError(code, msg)
  res.status(err.code).send(err)
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
  if (!form) { throw new Error('form is missing') }

  // Ensure all given definitions are included in the form
  const invalidKey = defs.find(d => !form[d])
  if (invalidKey) { throw new Error(`${invalidKey} is missing`) }

  // Validate emails
  if (form.email && !emailValidator.validate(form.email)) { throw new Error('email is invalid') }

  // Validate passwords
  if (form.password) {
    if (form.password.length < 8) { throw new Error('password is too short') } else if (form.password.length > 70) { throw new Error('password is too long') }
  }

  if (form.phone && !/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(form.phone)) { throw new Error('phone number is invalid') }
}
