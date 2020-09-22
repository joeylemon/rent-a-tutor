import express from 'express'

/**
 * @swagger
 * 
 * components:
 *   schemas:
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