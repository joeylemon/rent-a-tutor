import express from 'express'

import * as ListService from './lists.service.js'

const router = express.Router()

/**
 * @api {get} /lists/endpoints 1. List of endpoints
 * @apiDescription Retrieve a list of all API endpoints
 * @apiName get_endpoints
 * @apiGroup ListsGroup
 *
 * @apiSampleRequest /lists/endpoints
 */
router.get('/endpoints', async (req, res, next) => {
    try {
        res.status(200).json(ListService.getEndpoints())
    } catch (err) {
        next(err)
    }
})

/**
 * @api {get} /lists/genders 2. List of genders
 * @apiDescription Retrieve the list of genders
 * @apiName get_genders
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
 * @api {get} /lists/roles 3. List of user roles
 * @apiDescription Retrieve the list of user roles
 * @apiName get_roles
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
 * @api {get} /lists/states 4. List of U.S. states
 * @apiDescription Retrieve the list of U.S. states
 * @apiName get_states
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
 * @api {get} /lists/cities/:state 5. List of U.S. cities
 * @apiDescription Retrieve a list of U.S. cities within a state
 * @apiName get_cities
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
