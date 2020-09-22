import { RequestError } from './objects.js'

export const JWT_KEY = "nJimPrqTm@M9@Y5k6&G$ZqZbzZ8ZGAC1iFLYu&qByZu9m4Jz2U&nx6CQ*82nxw8QO@Fxgh^c5M%k5DexY$nffi77UYTDNF7$spE!"

/**
 * @swagger
 * 
 * components:
 *   responses:
 *     Unauthorized:
 *       description: The given API token in the Authorization header is invalid
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RequestError'
 *     InvalidParameters:
 *       description: The request parameters are missing or are invalid
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RequestError'
 */
export const ERRORS = {
    "unauthorized": new RequestError(401, "The given authentication is invalid. Please check the API token in the Authorization header."),
    "invalid_parameters": new RequestError(403, "The request has missing or invalid parameters.")
}