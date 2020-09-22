import express from 'express'
import jwt from 'jsonwebtoken'

import { JWT_KEY } from '../../secrets.js'
import { requestError } from '../../utils.js'

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
 */
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
 *             email: joeyclemon@gmail.com
 *             password: hunter2
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

export default router