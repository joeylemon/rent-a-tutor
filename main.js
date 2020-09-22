import express from 'express'

import { authorize } from './utils.js'

import docs from './routes/docs/router.js'
import auth from './routes/auth/router.js'
import user from './routes/user/router.js'

const router = express.Router()
const app = express()

/**
 * Documentation endpoint
 */
router.use("/docs", docs)

/**
 * @swagger
 * 
 * tags:
 *   name: Auth
 *   description: Endpoints that handle authorization
 */
router.use("/auth", auth)

/**
 * @swagger
 * 
 * tags:
 *   name: Users
 *   description: User management
 */
router.use("/user", user)

/**
 * All endpoints fall under /api/v1 path
 */
app.use("/api/v1", router)

const server = app.listen(6055, function () {
    console.log(`Listening on port ${server.address().port}`)
})