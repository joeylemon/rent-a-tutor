import pino from 'pino'

/**
 * @apiDefine Unauthorized
 * @apiError Unauthorized 401 - The request presents invalid authentication values
 */
/**
 * @apiDefine InvalidParameters
 * @apiError InvalidParameters 403 - The request has missing or invalid parameters
 */
/**
 * @apiDefine DatabaseError
 * @apiError DatabaseError 500 - An error occurred with the database
 */

/**
 * A custom logger
 */
export const logger = pino()

/**
 * The amount of time (in seconds) that an API token will expire after it was issued
 */
export const API_TOKEN_EXPIRE_TIME = 2592000
