import express from 'express'
import { reqErr } from '../../utils.js'
import * as AuthService from './auth.service.js'
import * as UserService from '../user/user.service.js'

const router = express.Router()

/**
 * @api {post} /auth/login Login
 * @apiDescription Authenticate the user with their email and password and receive an API token to use for further requests.
 * Subsequent calls to the API should set the Authorization header with the token, such as:
 *
 * <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOj._X_oyzQ9Lz-MedQeXUX7LdFNZyC3</code>
 * @apiName UserLogin
 * @apiGroup AuthGroup
 *
 * @apiParam {String} email The user's email
 * @apiParam {String} password The user's password
 *
 * @apiUse TokenReturn
 * @apiUse InvalidParameters
 *
 * @apiSampleRequest /auth/login
 */
router.post('/login', async (req, res) => {
  try {
    res.status(200).json(await AuthService.login(req.body))
  } catch (err) {
    return reqErr(res, 403, err)
  }
})

/**
 * @api {post} /auth/register Register user
 * @apiDescription Register a new user with the application
 * @apiName UserRegister
 * @apiGroup AuthGroup
 *
 * @apiParam {String} email The user's email
 * @apiParam {String} password The user's password
 * @apiParam {String} name The user's name
 * @apiParam {String} [phone] The user's phone number
 * @apiParam {String} [dob] The user's date of birth
 *
 * @apiUse UserReturn
 * @apiUse InvalidParameters
 */
router.post('/register', async (req, res) => {
  try {
    res.status(200).json(await UserService.registerUser(req.body))
  } catch (err) {
    return reqErr(res, 403, err)
  }
})

export default router
