/**
 * TODO:
 *
 * - messages between users
 * - S3 for file uploads
 *
 */

import express from 'express'
import bodyParser from 'body-parser'

import { RequestError, UndefinedRouteError, InternalServerError } from './objects.js'
import { getRequestInformation } from './utils.js'
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
router.use('/user', user)

/**
 * @apiDefine ListsGroup Lists
 * These endpoints define routes to retrieve serverside lists. Use these endpoints to populate front-end dropdowns.
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
        logger.child({ request: getRequestInformation(req), error: err }).error()
        return res.status(err.code).json(err)
    }

    const internalErr = new InternalServerError()
    internalErr.message = err.toString()
    logger.child({ request: getRequestInformation(req), error: internalErr }).error()
    res.status(500).json(internalErr)
})

// Unknown routes
app.all('*', (req, res) => {
    const err = new UndefinedRouteError()
    res.status(err.code).json(err)
})

const server = app.listen(6055, function () {
    logger.info('Listening on port %d', server.address().port)
})
