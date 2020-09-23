export class RequestError {
    constructor(code, message) {
        this.code = code

        const arr = message.split("Error: ")
        this.message = arr.length > 1 ? arr[1] : arr[0]
    }

    toString() {
        return JSON.stringify(this)
    }
}

/**
 * @apiDefine TokenReturn Return an API token
 * @apiSuccess {String} token The token string to put in the Authorization header
 * @apiSuccess {Number} expiration The UNIX timestamp at which the token expires
 * @apiSuccessExample Success Response:
 *     {
 *       "token": "n8tMnthS$V5*8^iyu1HEhX63",
 *       "expiration": 1600809341558
 *     }
 */
export class Token {
    constructor(token, expiration) {
        this.token = token
        this.expiration = expiration
    }
}