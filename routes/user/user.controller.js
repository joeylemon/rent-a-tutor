import express from 'express'
import * as UserService from './user.service.js'

const router = express.Router()

/**
 * @api {get} /user/list List users
 * @apiDescription Get the list of all registered users
 * @apiPermission Token
 * @apiName ListUsers
 * @apiGroup UserGroup
 * 
 * @apiUse UserListReturn
 * @apiUse Unauthorized
 * @apiUse Header
 */
router.get("/list", async (req, res) => {
    const users = await UserService.getAllUsers()
    res.status(200).json(users)
})

export default router