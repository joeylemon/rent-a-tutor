import express from 'express'

import * as ListService from './lists.service.js'

const router = express.Router()

/**
 * @api {get} /lists/genders List of genders
 * @apiDescription Retrieve the list of genders
 * @apiName ListsGenders
 * @apiGroup ListsGroup
 *
 * @apiUse DatabaseError
 *
 * @apiSampleRequest /lists/genders
 */
router.get('/genders', async (req, res, next) => {
    try {
        res.status(200).json(await ListService.getGenders())
    } catch (err) {
        next(err)
    }
})

/**
 * @api {get} /lists/roles List of user roles
 * @apiDescription Retrieve the list of user roles
 * @apiName ListsRoles
 * @apiGroup ListsGroup
 *
 * @apiUse DatabaseError
 *
 * @apiSampleRequest /lists/roles
 */
router.get('/roles', async (req, res, next) => {
    try {
        res.status(200).json(await ListService.getRoles())
    } catch (err) {
        next(err)
    }
})

/**
 * @api {get} /lists/states List of U.S. states
 * @apiDescription Retrieve the list of U.S. states
 * @apiName ListsStates
 * @apiGroup ListsGroup
 *
 * @apiUse DatabaseError
 *
 * @apiSampleRequest /lists/states
 */
router.get('/states', async (req, res, next) => {
    try {
        res.status(200).json(await ListService.getStates())
    } catch (err) {
        next(err)
    }
})

/**
 * @api {get} /lists/cities/:state List of U.S. cities
 * @apiDescription Retrieve a list of U.S. cities within a state
 * @apiName ListsCities
 * @apiGroup ListsGroup
 *
 * @apiParam (URL Parameters) {String} state The state to find cities within
 *
 * @apiUse DatabaseError
 *
 * @apiSampleRequest /lists/cities/:state
 */
router.get('/cities/:state', async (req, res, next) => {
    try {
        res.status(200).json(await ListService.getCities(req.params.state))
    } catch (err) {
        next(err)
    }
})

export default router
