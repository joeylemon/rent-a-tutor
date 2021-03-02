import express from 'express'
import * as UserService from './user.service.js'

const router = express.Router()

/**
 * @api {get} /user/profile/me Current user profile
 * @apiDescription Get the current user's profile information
 * @apiPermission Token
 * @apiName CurrentUserProfile
 * @apiGroup UserGroup
 *
 * @apiUse UserReturn
 * @apiUse UnauthorizedError
 * @apiUse DatabaseError
 * @apiUse Header
 */
router.get('/profile/me', async (req, res, next) => {
    try {
        res.status(200).json(await UserService.getUserByID(res.locals.user.id))
    } catch (err) {
        next(err)
    }
})

/**
 * @api {get} /user/profile/:id User profile
 * @apiDescription Get a user's profile information
 * @apiPermission Token
 * @apiName UserProfile
 * @apiGroup UserGroup
 *
 * @apiParam (URL Parameters) {Number} id The id of the user to retrieve
 *
 * @apiUse UserReturn
 * @apiUse UnauthorizedError
 * @apiUse DatabaseError
 * @apiUse Header
 */
router.get('/profile/:id', async (req, res, next) => {
    try {
        res.status(200).json(await UserService.getUserByID(req.params.id))
    } catch (err) {
        next(err)
    }
})

/**
 * @api {get} /user/nearby/:distance Nearby tutors
 * @apiDescription Get nearby tutors ordered by distance
 * @apiPermission Token
 * @apiName UserNearby
 * @apiGroup UserGroup
 *
 * @apiParam (URL Parameters) {Number} distance The distance in miles to search
 *
 * @apiUse UserSimpleArrayReturn
 * @apiUse UnauthorizedError
 * @apiUse DatabaseError
 * @apiUse Header
 */
router.get('/nearby/:distance', async (req, res, next) => {
    try {
        res.status(200).json(await UserService.getNearbyTutors(res.locals.user, req.params.distance))
    } catch (err) {
        next(err)
    }
})

export default router
