/**
 * Controller-Service Model
 * 
 * Controller: controllers are in charge of setting up endpoints and calling the 
 *             appropriate service function. only the controllers have references to the req object
 * Service:    services do most of the work and contain the business logic, editing database models when necessary
 * 
 */

import express from 'express'
import bodyParser from 'body-parser'

import { authorize } from './utils.js'

import docs from './routes/docs/router.js'
import auth from './routes/auth/auth.controller.js'
import user from './routes/user/user.controller.js'

const router = express.Router()
const app = express()

/**
 * Documentation endpoint
 */
router.use("/docs", docs)

router.use("/auth", auth)

router.use("/user", authorize, user)

/**
 * Parse request body
 */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * All endpoints fall under /api/v1 path
 */
app.use("/api/v1", router)

const server = app.listen(6055, function () {
    console.log(`Listening on port ${server.address().port}`)
})