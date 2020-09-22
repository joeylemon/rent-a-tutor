import express from 'express'
import jwt from 'jsonwebtoken'

import { JWT_KEY } from '../../constants.js'
import { unauthorized, invalidRequest } from '../../utils.js'

/**
 * @swagger
 * 
 * components:
 *   schemas:
 *     Token:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: The API token
 *         expiration:
 *           type: number
 *           description: The UNIX timestamp at which the token will expire
 *       example:
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZXljbGVtb25AZ21haWwuY29tIiwiaWF0IjoxNjAwNzMzMDE1LCJleHAiOjE2MDMzMjUwMTV9.a1KJ_zprLqxk38cEieO5Ksir6c-Oijywas5OLC7iULQ
 *         expiration: 1600732403449
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Unique id for the user
 *         name:
 *           type: string
 *           description: The user's full name
 *         email:
 *           type: string
 *           format: email
 *           description: Email for the user
 *         phone:
 *           type: string
 *           format: phone
 *           description: Phone number for the user
 *       example:
 *          - id: 10324
 *            name: Joey
 *            email: joey@rentatutor.com
 *            phone: 5159998523
 *          - id: 120352
 *            name: Dustin
 *            email: dustin@rentatutor.com
 *            phone: 1234567890
 */
const router = express.Router()

/**
 * @swagger
 *
 * /user/login:
 *   post:
 *     tags: [Users]
 *     summary: "Authenticate the user"
 *     description: "Login using the user's credentials and receive an API token to use within the client"
 *     requestBody:
 *       description: The user's login information
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
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
 *         $ref: '#/components/responses/InvalidData'
 */
router.post("/login", (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
        return invalidRequest(res)
    }

    const expireTime = 2592000
    const token = jwt.sign({ email: req.body.email }, JWT_KEY, {
        algorithm: "HS256",
        expiresIn: expireTime,
    })

    res.status(200).send({
        token: token,
        expiration: Date.now() + expireTime
    })
})

/**
 * @swagger
 *
 * /user/list:
 *   get:
 *     tags: [Users]
 *     summary: "List users"
 *     description: "Retrieve the list of all users registered with RAT"
 *     security:
 *       - Authorization API Token: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The list of all users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get("/list", (req, res) => {
    const users = [
        {
            id: 1,
            email: "joeyclemon@gmail.com",
            name: "Joey Lemon",
            phone: "6159468534"
        }
    ]
    res.send(JSON.stringify(users))
})

export default router