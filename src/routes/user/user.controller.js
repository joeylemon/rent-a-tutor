import express from 'express'
import { authorize } from '../auth/auth.service.js'
import { multerUpload } from '../../utils/constants.js'
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
 * @api {put} /user/profile/me 2. Update user profile
 * @apiDescription Update fields of a user's profile
 * @apiPermission Token
 * @apiName update_user_profile
 * @apiGroup UserGroup
 *
 * @apiParam {String} email The user's email
 * @apiParam {String} name The user's name
 * @apiParam {String} city The user's city
 * @apiParam {String} state The user's state
 * @apiParam {String} phone The user's phone number
 * @apiParam {String} dob The user's date of birth
 * @apiParam {String} genderId The user's gender ID
 * @apiParam {String} roleId The user's role ID
 * @apiParam {String} latitude The user's latitude
 * @apiParam {String} longitude The user's longitude
 *
 * @apiUse SuccessResponse
 * @apiUse UnauthorizedError
 * @apiUse BadRequestError
 * @apiUse DatabaseError
 * @apiUse Header
 */
router.put('/profile/me', authorize, async (req, res, next) => {
    try {
        res.status(200).send(await UserService.updateUserProfile(res.locals.user, req.body))
    } catch (err) {
        next(err)
    }
})

/**
 * @api {put} /user/profile/me/avatar 3. Upload user avatar
 * @apiDescription Upload a new image to be the user's avatar
 *
 * Files must be uploaded with the multipart/form-data header. This documentation page is unable to do so,
 * so you can try it out at the [multipart/form test page](https://jlemon.org/rat/api/v1/docs/multipart.html)
 * @apiPermission Token
 * @apiName update_user_profile_avatar
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
router.put('/profile/me/avatar', authorize, multerUpload.single('image'), async (req, res, next) => {
    try {
        res.status(200).send(await UserService.updateAvatar(res.locals.user, req.file))
    } catch (err) {
        next(err)
    }
})

/**
 * @api {get} /user/profile/me/:fields 4. Get user profile values
 * @apiDescription Get specific fields of a user's profile
 * @apiPermission Token
 * @apiName get_user_profile_values
 * @apiGroup UserGroup
 *
 * @apiParam (URL Parameters) {String} fields The comma-separated list of profile fields to retrieve
 *
 * @apiSuccessExample Success Response:
 * {
 *     "name": "Joey",
 *     "dob": "2000-03-24",
 *     "phone": "6159468534",
 *     "city": "Knoxville"
 * }
 * @apiUse UnauthorizedError
 * @apiUse DatabaseError
 * @apiUse Header
 */
router.get('/profile/me/:fields', authorize, async (req, res, next) => {
    try {
        res.status(200).send(await UserService.getUserValuesByID(res.locals.user.id, req.params.fields.split(',')))
    } catch (err) {
        next(err)
    }
})

/**
 * @api {get} /user/profile/:id 5. View other user profile
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

/**
 * @api {get} /user/nearby/:distance/:page 6. Find nearby tutors
 * @apiDescription Get nearby tutors ordered by distance. Results are paginated, where the next page URL
 * is given in the result if it exists.
 * @apiPermission Token
 * @apiName get_nearby_tutors
 * @apiGroup UserGroup
 *
 * @apiParam (URL Parameters) {Number} distance The distance in miles to search
 * @apiParam (URL Parameters) {Number} page The page to retrieve
 *
 * @apiSuccessExample Success Response:
 * {
 *     "next": "https://jlemon.org/rat/api/v1/user/nearby/500/2",
 *     "tutors": [
 *         {
 *             "id": 11,
 *             "name": "Bobby",
 *             "city": "Knoxville",
 *             "state": "TN",
 *             "dob": "2000-03-24",
 *             "gender": "Male",
 *             "role": "Tutor",
 *             "distance": 6.8858799822053545
 *         }
 *     ]
 * }
 *
 * @apiUse BadRequestError
 * @apiUse UnauthorizedError
 * @apiUse DatabaseError
 * @apiUse Header
 */
router.get('/nearby/:distance/:page', authorize, async (req, res, next) => {
    try {
        res.status(200).json(await UserService.getNearbyTutors(res.locals.user, req.params.distance, req.params.page))
    } catch (err) {
        next(err)
    }
})

export default router
