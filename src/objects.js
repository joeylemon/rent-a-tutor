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
    constructor (desc, name, code) {
        super(desc)
        this.name = name
        this.code = code
    }

    toJSON () {
        return {
            name: this.name,
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
    constructor (desc, name = 'Unauthorized Error', code = HTTP_CODE.UNAUTHORIZED) {
        super(desc, name, code)
    }
}

/**
 * @apiDefine BadRequestError
 * @apiError BadRequestError 403 - The request has missing or invalid parameters
 */
export class BadRequestError extends RequestError {
    constructor (desc, name = 'Bad Request Error', code = HTTP_CODE.BAD_REQUEST) {
        super(desc, name, code)
    }
}

/**
 * @apiDefine TokenReturn Return an API token
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
