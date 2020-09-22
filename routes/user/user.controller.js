import express from 'express'
import * as UserService from './user.service.js'
import { requestError } from '../../utils.js'

const router = express.Router()

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
router.get("/list", async (req, res) => {
    const users = await UserService.getAllUsers()
    res.status(200).json(users)
})

export default router