const HTTP_CODE = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
}

/**
 * @apiDefine DatabaseError
 * @apiError DatabaseError 500 - An error occurred with the database
 */
export class RequestError extends Error {
    constructor (desc, name, code, id) {
        super(desc)
        this.name = name
        this.code = code
        this.id = id
    }

    toJSON () {
        return {
            name: this.name,
            id: this.id,
            code: this.code,
            message: this.message
        }
    }

    toString () {
        return JSON.stringify(this.toJSON())
    }
}

/**
 * @apiDefine UnauthorizedError
 * @apiError UnauthorizedError 401 - The request presents invalid authentication values
 */
export class UnauthorizedError extends RequestError {
    constructor (desc, name = 'Unauthorized Error', code = HTTP_CODE.UNAUTHORIZED, id = 1) {
        super(desc, name, code, id)
    }
}

/**
 * @apiDefine BadRequestError
 * @apiError BadRequestError 403 - The request has missing or invalid parameters
 */
export class BadRequestError extends RequestError {
    constructor (desc, name = 'Bad Request Error', code = HTTP_CODE.BAD_REQUEST, id = 2) {
        super(desc, name, code, id)
    }
}

/**
 * @apiDefine UndefinedRouteError
 * @apiError UndefinedRouteError 404 - The route/method doesn't exist
 */
export class UndefinedRouteError extends RequestError {
    constructor (desc = 'You have possibly forgotten to specify a url parameter, used the wrong method (POST, GET), or tried to access a route that does not exist', name = 'Undefined Route Error', code = HTTP_CODE.BAD_REQUEST, id = 3) {
        super(desc, name, code, id)
    }
}

/**
 * @apiDefine LoginTokensReturn Return a login object
 * @apiSuccess {String} api The API token
 * @apiSuccess {String} api.token The token string to put in the Authorization header
 * @apiSuccess {String} api.expiration The UNIX timestamp at which the token expires (5 minutes after)
 * @apiSuccess {String} refresh The refresh token
 * @apiSuccess {String} refresh.token The token string to store on the device
 * @apiSuccess {String} refresh.expiration The UNIX timestamp at which the token expires (30 days after)
 * @apiSuccessExample Success Response:
 *     {
 *       "api": {
 *           "token": "eyJhbGciOiJIUzI.eyJlbWFpbCI6InRlc3RAdGVz._X_oyzQ9Lz-MedQeXUX7LdF",
 *           "expiration": 1600809341558
 *       },
 *       "refresh": {
 *           "token": "eyJhbGciOiJIUzI.eyJlbWFpbCI6InRlc3RAdGVz.RVcYtudHgdZBZmgqlERsZfe",
 *           "expiration": 1601441505925
 *       }
 *     }
 */
/**
 * @apiDefine APITokenReturn Return an API token
 * @apiSuccess {String} token The token string to put in the Authorization header
 * @apiSuccess {Number} expiration The UNIX timestamp at which the token expires
 * @apiSuccessExample Success Response:
 *     {
 *       "token": "eyJhbGciOiJIUzI.eyJlbWFpbCI6InRlc3RAdGVz._X_oyzQ9Lz-MedQeXUX7LdF",
 *       "expiration": 1600809341558
 *     }
 */
export class Token {
    constructor (token, expiration) {
        this.token = token
        this.expiration = expiration
    }
}
