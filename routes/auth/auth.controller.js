import express from 'express'
import { requestError } from '../../utils.js'
import * as AuthService from './auth.service.js'
import * as UserService from '../user/user.service.js'

const router = express.Router()

/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: "Authenticate the user"
 *     description: "Login using the user's credentials and receive an API token to use within the client"
 *     requestBody:
 *       description: The user's login information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *           example:
 *             email: 'joeyclemon@gmail.com'
 *             password: 'hunter2'
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *       403:
 *         $ref: '#/components/responses/InvalidParameters'
 */
router.get("/login", (req, res) => {
    if (!req.body)
        return requestError(res, "invalid_parameters", "missing request body")

    if (!req.body.email || !req.body.password)
        return requestError(res, "invalid_parameters", req.body.email, req.body.password)

    // UserService.authenticate(email, password)

    res.status(200).json(AuthService.getAPIToken(req.body.email))
})

/**
 * @swagger
 *
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: "Register user"
 *     description: "Register a new user with Rent-a-Tutor"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *       403:
 *         $ref: '#/components/responses/InvalidParameters'
 */
router.post("/create", async (req, res) => {
    try {
        const user = await UserService.registerUser(req.body)
        res.status(200).send("OK")
    } catch (err) {
        requestError(res, "invalid_parameters", err)
    }
})

export default router