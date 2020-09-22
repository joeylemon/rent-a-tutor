import express from 'express'
import swaggerDoc from 'swagger-jsdoc'

const router = express.Router()

const options = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Rent-a-Tutor",
            version: "1.0.0",
            description:
                "Rent-a-Tutor (RAT) API provides the endpoints required to operate the RAT services",
            license: {
                name: "MIT",
                url: "https://choosealicense.com/licenses/mit/"
            },
            contact: {
                name: "Rent-a-Tutor",
                url: "https://github.com/rent-a-tutor"
            }
        },
        servers: [
            {
                url: "https://jlemon.org/rat/api/v1"
            }
        ],
        components: {
            securitySchemes: {
                "Authorization API Token": {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: "The usage of the API requires authentication with the [/api/v1/auth/login](#tag/Auth/paths/~1auth~1login/post) route. Subsequent calls to the API must include the returned token in the `Authorization` header of each request. For example, the [/api/v1/auth/login](#tag/Auth/paths/~1auth~1login/post) may return the token:\n\n`{\"token\": \"aaa.bbb.ccc\", \"expiration\": 1600788665199}`\n\nThe next API call must set the `Authorization` header to `Bearer aaa.bbb.ccc`"
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ["./*.js", "./routes/*/*.js"]
}

const specs = swaggerDoc(options)
router.get("/swagger.json", (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(specs)
})
router.get("/", (req, res) => {
    res.sendFile("/home/dustin/rat/routes/docs/html/index.html")
})

export default router