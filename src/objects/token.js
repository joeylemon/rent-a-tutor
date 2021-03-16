/**
 * @apiDefine TokenResponse
 * @apiSuccessExample Success Response:
 *     {
 *         "token": "eyJhbGciOiJIUzI.eyJlbWFpbCI6InRlc3RAdGVz._X_oyzQ9Lz-MedQeXUX7LdF",
 *         "expiration": 1600809341558
 *     }
 */
class Token {
    constructor (token, expiration) {
        this.token = token
        this.expiration = expiration
    }
}

export default Token
