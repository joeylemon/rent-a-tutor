import express from 'express'
import { requestError } from '../../utils.js'
import * as AuthService from './auth.service.js'
import * as UserService from '../user/user.service.js'

const router = express.Router()

/**
 * @api {post} /auth/login Login
 * @apiDescription Authenticate the user and receive an API token to use with further requests
 * @apiName UserLogin
 * @apiGroup Auth
 * 
 * @apiParam {String} email The user's email
 * @apiParam {String} password The user's password
 * 
 * @apiUse TokenReturn
 * @apiUse InvalidParameters
 * 
 * @apiSampleRequest /auth/login
 */
router.post("/login", async (req, res) => {
    try {
        res.status(200).json(await AuthService.login(req.body))
    } catch (err) {
        requestError(res, 403, err.toString())
    }
})

/**
 * @api {post} /auth/register Register user
 * @apiDescription Register a new user with the application
 * @apiName UserRegister
 * @apiGroup Auth
 * 
 * @apiParam (Request body) {String} email The user's email
 * @apiParam (Request body) {String} password The user's password
 * @apiParam (Request body) {String} name The user's name
 * @apiParam (Request body) {String} [phone] The user's phone number
 * @apiParam (Request body) {String} [dob] The user's date of birth
 * 
 * @apiUse UserReturn
 * @apiUse InvalidParameters
 */
router.post("/register", async (req, res) => {
    try {
        const user = await UserService.registerUser(req.body)
        res.status(200).json(user)
    } catch (err) {
        requestError(res, 403, err.toString())
    }
})

export default router