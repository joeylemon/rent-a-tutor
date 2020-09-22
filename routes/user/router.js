import express from 'express'
import User from '../../db/user.js'

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
    const users = await User.findAll()
    res.send(JSON.stringify(users))
})

export default router