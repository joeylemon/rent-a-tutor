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

import { RequestError, UndefinedRouteError } from './objects.js'
import { authorize } from './utils.js'
import { logger } from './constants.js'

import docs from './routes/docs/router.js'
import auth from './routes/auth/auth.controller.js'
import user from './routes/user/user.controller.js'
import lists from './routes/lists/lists.controller.js'

const router = express.Router()
const app = express()

/**
 * Documentation endpoint
 */
router.use('/docs', docs)

/**
 * @apiDefine AuthGroup Auth
 * These endpoints define routes to authenticate users. There is in-depth documentation on the
 * authorization process in the [repository's README](https://github.com/rent-a-tutor/backend/tree/master/src/routes/auth).
 */
router.use('/auth', auth)

/**
 * @apiDefine UserGroup User
 * These endpoints define routes to interact with users.
 */
router.use('/user', authorize, user)

/**
 * @apiDefine ListsGroup Lists
 * These endpoints define routes to retrieve serverside lists that can be used throughout
 * the application via foreign key ids. Use the endpoints to populate front-end dropdowns
 * such as profile creation genders.
 */
router.use('/lists', lists)

// Parse the request body to get req.body parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// All endpoints fall under /api/v1 path
app.use('/api/v1', router)

// Error handler middleware
app.use((err, req, res, next) => {
    if (err instanceof RequestError) {
        logger.child({ error: err.toJSON() }).error()
        return res.status(err.code).json(err.toJSON())
    }

    err = { name: 'Internal Server Error', code: 500, message: err.toString() }
    logger.child({ error: err }).error()
    res.status(500).json(err)
})

// Unknown routes
app.get('*', (req, res) => {
    const err = new UndefinedRouteError()
    res.status(err.code).json(err.toJSON())
})

const server = app.listen(6055, function () {
    logger.info('Listening on port %d', server.address().port)
})
