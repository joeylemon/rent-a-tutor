import express from 'express'
import * as AuthService from './auth.service.js'
import * as UserService from '../user/user.service.js'

const router = express.Router()

/**
 * @api {post} /auth/login Login
 * @apiDescription Authenticate the user with their email and password and receive an API
 * token. Subsequent calls to the API should set the Authorization header with the API
 * token, such as below:
 *
 * <code>Authorization: Bearer eyJhbGciOiJIUzI1NiIsIn.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOj._X_oyzQ9Lz-MedQeXUX7LdFNZyC3</code>
 *
 * Each API token expires in thirty days. The API token should be stored locally on the user's
 * device to prevent logging in every time the application is opened.
 *
 * You can find more in-depth information on authorization in the [repository's README](https://github.com/rent-a-tutor/backend/tree/master/src/routes/auth)
 * @apiName UserLogin
 * @apiGroup AuthGroup
 *
 * @apiParam {String} email The user's email
 * @apiParam {String} password The user's password
 * @apiSuccessExample Success Response:
 *     {
 *         "token": "eyJhbGciOiJIUzI.eyJlbWFpbCI6InRlc3RAdGVz._X_oyzQ9Lz-MedQeXUX7LdF",
 *         "expiration": 1600809341558
 *     }
 *
 * @apiUse BadRequestError
 * @apiUse DatabaseError
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
 * @api {post} /auth/register Register user
 * @apiDescription Register a new user with the application
 * @apiName UserRegister
 * @apiGroup AuthGroup
 *
 * @apiParam {String} email The user's email
 * @apiParam {String} password The user's password
 * @apiParam {String} name The user's name
 * @apiParam {String} city The user's city
 * @apiParam {String} state The user's state
 * @apiParam {String} phone The user's phone number
 * @apiParam {String} dob The user's date of birth
 * @apiParam {String} genderId The user's gender ID
 * @apiParam {String} roleId The user's role ID
 *
 * @apiUse UserReturn
 * @apiUse BadRequestError
 * @apiUse DatabaseError
 */
router.post('/register', async (req, res, next) => {
    try {
        res.status(200).json(await UserService.registerUser(req.body))
    } catch (err) {
        next(err)
    }
})

export default router
