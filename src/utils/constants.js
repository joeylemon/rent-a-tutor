import path from 'path'
import pino from 'pino'
import multer from 'multer'
import fs from 'fs'
import { randString } from './utils.js'

// A custom logger
export const logger = pino()

// Absolute paths to project directories
export const dirs = {
    src: path.resolve('src/'),
    routes: path.resolve('src/routes/'),
    docs: path.resolve('src/routes/docs/'),
    images: path.resolve('src/img/'),
    uploads: path.resolve('uploads/')
}

// Multer uploader to save images to the upload folder and check their file type
export const multerUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dirs.uploads)
        },
        filename: function (req, file, cb) {
            cb(null, randString(30) + path.extname(file.originalname))
        }
    }),
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/
        // Check ext
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
        // Check mime
        const mimetype = filetypes.test(file.mimetype)
        if (extname && mimetype) {
            cb(null, true)
        } else {
            return cb(new Error('invalid file type given'))
        }
    }
})

// The base URL for the API
export const BASE_URL = JSON.parse(fs.readFileSync(path.resolve('package.json'))).apidoc.url

// The amount of time (in seconds) that an API token will expire after it was issued
export const API_TOKEN_EXPIRE_TIME = 60 * 60 * 24 * 30

// How many results to include in a paginated endpoint
export const PAGINATION_PAGE_SIZE = 50
