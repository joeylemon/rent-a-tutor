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