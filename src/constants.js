import path from 'path'
import pino from 'pino'
import multer from 'multer'
import fs from 'fs'
import { randString } from './utils.js'

// The base URL for the API
export const baseURL = JSON.parse(fs.readFileSync(path.resolve('package.json'))).apidoc.url

// A custom logger
export const logger = pino()

// Absolute path to the file upload directory
export const uploadDestination = path.resolve('uploads/')

// Absolute path to the images directory
export const imagesDirectory = path.resolve('src/img/')

// Multer uploader to save images to the upload folder and check their file type
export const multerUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadDestination)
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

// The amount of time (in seconds) that an API token will expire after it was issued
export const API_TOKEN_EXPIRE_TIME = 2592000
