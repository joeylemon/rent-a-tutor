import jwt from 'jsonwebtoken'
import { JWT_KEY } from './constants.js'

export function authorize(req, res, next) {
    const header = req.header('Authorization')
    if (!header) return unauthorized(res)

    const token = header.replace('Bearer ', '')
    const decoded = jwt.verify(token, JWT_KEY)

    // Find user with token and id
    const user = { id: 1, email: "joeyclemon@gmail.com", name: "Joey Lemon" }
    if (!user) return unauthorized(res)

    res.locals.user = user
    res.locals.token = token
    next()
}

export function unauthorized(res) {
    res.status(401).send({
        code: "401",
        message: "The given authentication is invalid. Please check the API token in the Authorization header."
    })
}

export function invalidRequest(res) {
    res.status(403).send({
        code: "403",
        message: "The request has missing or invalid parameters."
    })
}