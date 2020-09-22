/**
 * @swagger
 * 
 * components:
 *   schemas:
 *     RequestError:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           description: The HTTP status code associated with this error
 *         message:
 *           type: string
 *           description: The description of this error
 *         values:
 *           type: array
 *           description: List of optional values to be sent with the error
 *           items:
 *             type: string
 *       example:
 *         code: 403
 *         message: The request has missing or invalid parameters.
 *         values:
 *           - jc@gm.cm
 *           - invalidpass
 */
export class RequestError {
    constructor(code, message) {
        this.code = code
        this.message = message
    }

    toJSON(...args) {
        const obj = { code: this.code, message: this.message }

        if (args.length > 0)
            obj.values = args

        return JSON.stringify(obj)
    }
}

/**
 * @swagger
 * 
 * components:
 *   schemas:
 *     Token:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: The API token
 *         expiration:
 *           type: number
 *           description: The UNIX timestamp at which the token will expire
 *       example:
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvZXljbGVtb25AZ21haWwuY29tIiwiaWF0IjoxNjAwNzMzMDE1LCJleHAiOjE2MDMzMjUwMTV9.a1KJ_zprLqxk38cEieO5Ksir6c-Oijywas5OLC7iULQ
 *         expiration: 1600732403449
 */
export class Token {
    constructor(token, expiration) {
        this.token = token
        this.expiration = expiration
    }
}