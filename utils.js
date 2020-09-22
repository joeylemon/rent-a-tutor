export function unauthorized(res) {
    res.status(401).send({
        code: "401",
        message: "The given authentication is invalid."
    })
}

export function invalidRequest(res) {
    res.status(403).send({
        code: "403",
        message: "The request is missing parameters or has invalid parameters."
    })
}