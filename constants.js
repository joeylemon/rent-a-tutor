/**
 * @apiDefine Unauthorized
 * @apiError Unauthorized The request presents invalid authentication values
 *
 * @apiErrorExample Error Response:
 *     {
 *       "code": 401,
 *       "message": "The given authentication is invalid. Please check the API token in the Authorization header."
 *     }
 */
/**
 * @apiDefine InvalidParameters
 * @apiError InvalidParameters The request has missing or invalid parameters
 *
 * @apiErrorExample Error Response:
 *     {
 *       "code": 403,
 *       "message": "The request has missing or invalid parameters."
 *     }
 */