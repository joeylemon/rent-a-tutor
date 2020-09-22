import express from 'express'

import docs from './routes/docs/router.js'
import user from './routes/user/router.js'

const router = express.Router()

router.use("/docs", docs)

/**
 * @swagger
 * 
 * tags:
 *   name: Users
 *   description: User management
 */
router.use("/user", user)

const app = express()
app.use("/api/v1", router)
const server = app.listen(6055, function () {
    console.log(`Listening on port ${server.address().port}`)
})