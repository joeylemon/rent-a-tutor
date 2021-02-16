import express from 'express'
import * as AuthService from './auth.service.js'
import * as UserService from '../user/user.service.js'

const router = express.Router()

/**
 * @api {post} /auth/login Login
 * @apiDescription Authenticate the user with their email and password and receive an API
 * token and a refresh token. Subsequent calls to the API should set the Authorization
 * header with the API token, such as:
 *
 * <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOj._X_oyzQ9Lz-MedQeXUX7LdFNZyC3</code>
 *
 * Each API token expires in five minutes. Therefore, you must use the refresh token with
 * /auth/refresh to receive a new API token.
 *
 * With this infrastructure, only the refresh token must be stored on the user's device to keep
 * the user logged in upon reopening the application (instead of the user's email and password).
 *
 * Since refresh tokens expire in 30 days, users must only re-enter their credentials once
 * every month.
 * @apiName UserLogin
 * @apiGroup AuthGroup
 *
 * @apiParam {String} email The user's email
 * @apiParam {String} password The user's password
 *
 * @apiUse LoginTokensReturn
 * @apiUse BadRequestError
 *
 * @apiSampleRequest /auth/login
 */
router.post('/login', async (req, res, next) => {
    try {
        res.status(200).json(await AuthService.login(req.body))
    } catch (err) {
        next(err)
    }
})

/**
 * @api {post} /auth/refresh Refresh API token
 * @apiDescription Using the user's stored refresh token, receive a new API token that will
 * be used in subsequent calls to the API within the Authorization header.
 * @apiName UserRefreshToken
 * @apiGroup AuthGroup
 *
 * @apiParam {String} refresh_token The user's stored refresh token
 *
 * @apiUse APITokenReturn
 * @apiUse BadRequestError
 *
 * @apiSampleRequest /auth/refresh
 */
router.post('/refresh', async (req, res, next) => {
    try {
        res.status(200).json(await AuthService.getAPIToken(req.body.refresh_token))
    } catch (err) {
        next(err)
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
 * @apiUse BadRequestError
 */
router.post('/register', async (req, res, next) => {
    try {
        res.status(200).json(await UserService.registerUser(req.body))
    } catch (err) {
        next(err)
    }
})

export default router
