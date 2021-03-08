import express from 'express'
import { authorize } from '../auth/auth.service.js'
import { multerUpload } from '../../constants.js'
import * as UserService from './user.service.js'

const router = express.Router()

/**
 * @api {get} /user/profile/me 1. Current user profile
 * @apiDescription Get the current user's profile information
 * @apiPermission Token
 * @apiName get_current_user_profile
 * @apiGroup UserGroup
 *
 * @apiUse UserReturn
 * @apiUse UnauthorizedError
 * @apiUse DatabaseError
 * @apiUse Header
 */
router.get('/profile/me', authorize, async (req, res, next) => {
    try {
        res.status(200).json(await UserService.getUserByID(res.locals.user.id))
    } catch (err) {
        next(err)
    }
})

/**
 * @api {post} /user/profile/edit/location 2. Update user location
 * @apiDescription Update the user's location to provide more accurate nearby tutors
 * @apiPermission Token
 * @apiName update_user_location
 * @apiGroup UserGroup
 *
 * @apiParam {Float} latitude The new latitude value
 * @apiParam {Float} longitude The new longitude value
 *
 * @apiUse SuccessResponse
 * @apiUse BadRequestError
 * @apiUse UnauthorizedError
 * @apiUse DatabaseError
 * @apiUse Header
 */
router.post('/profile/edit/location', authorize, async (req, res, next) => {
    try {
        res.status(200).send(await UserService.updateUserLocation(res.locals.user, req.body))
    } catch (err) {
        next(err)
    }
})

/**
 * @api {post} /user/profile/edit/avatar 3. Update user avatar
 * @apiDescription Upload a new image to be the user's avatar
 *
 * Files must be uploaded with the multipart/form-data header. This documentation page is unable to do so,
 * so you can try it out at the [multipart/form test page](https://jlemon.org/rat/api/v1/docs/multipart.html)
 * @apiPermission Token
 * @apiName update_user_avatar
 * @apiGroup UserGroup
 *
 * @apiHeader {String} Content-Type multipart/form-data
 * @apiParam {File} image The user's new profile picture
 *
 * @apiUse SuccessResponse
 * @apiUse BadRequestError
 * @apiUse UnauthorizedError
 * @apiUse DatabaseError
 * @apiUse Header
 * @apiSampleRequest off
 */
router.post('/profile/edit/avatar', authorize, multerUpload.single('image'), async (req, res, next) => {
    try {
        res.status(200).send(await UserService.updateAvatar(res.locals.user, req.file))
    } catch (err) {
        next(err)
    }
})

/**
 * @api {post} /user/profile/edit/:field 4. Update user profile
 * @apiDescription Update a specific field of a user's profile
 * @apiPermission Token
 * @apiName update_user_profile
 * @apiGroup UserGroup
 *
 * @apiParam (URL Parameters) {String} field The field of the profile to update
 * @apiParam {String} value The field value
 *
 * @apiUse SuccessResponse
 * @apiUse UnauthorizedError
 * @apiUse BadRequestError
 * @apiUse DatabaseError
 * @apiUse Header
 */
router.post('/profile/edit/:field', authorize, async (req, res, next) => {
    try {
        res.status(200).send(await UserService.updateUserProfile(res.locals.user, req.params.field, req.body.value))
    } catch (err) {
        next(err)
    }
})

/**
 * @api {get} /user/nearby/:distance 5. Find nearby tutors
 * @apiDescription Get nearby tutors ordered by distance
 * @apiPermission Token
 * @apiName get_nearby_tutors
 * @apiGroup UserGroup
 *
 * @apiParam (URL Parameters) {Number} distance The distance in miles to search
 *
 * @apiUse UserSimpleArrayReturn
 * @apiUse UnauthorizedError
 * @apiUse DatabaseError
 * @apiUse Header
 */
router.get('/nearby/:distance', authorize, async (req, res, next) => {
    try {
        res.status(200).json(await UserService.getNearbyTutors(res.locals.user, req.params.distance))
    } catch (err) {
        next(err)
    }
})

/**
 * @api {get} /user/profile/:id 6. View other user profile
 * @apiDescription Get another user's profile information
 * @apiPermission Token
 * @apiName get_user_profile
 * @apiGroup UserGroup
 *
 * @apiParam (URL Parameters) {Number} id The id of the user to retrieve
 *
 * @apiUse UserReturn
 * @apiUse BadRequestError
 * @apiUse UnauthorizedError
 * @apiUse DatabaseError
 * @apiUse Header
 */
router.get('/profile/:id', authorize, async (req, res, next) => {
    try {
        res.status(200).json(await UserService.getUserByID(req.params.id))
    } catch (err) {
        next(err)
    }
})

router.get('/profile/:id/avatar', async (req, res, next) => {
    try {
        const filepath = await UserService.getAvatarPath(req.params.id)
        res.sendFile(filepath)
    } catch (err) {
        next(err)
    }
})

export default router
