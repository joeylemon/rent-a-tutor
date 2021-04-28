import { logger } from './constants.js'

if (!process.env.RAT_CONFIG) {
    logger.error('missing RAT_CONFIG environment variable')
    process.exit(1)
}
const RAT_CONFIG = JSON.parse(process.env.RAT_CONFIG)

// The key used to encrypt API tokens
export const JWT_KEY = RAT_CONFIG.JWT_KEY

// The connection details for accessing the MySQL database
export const MYSQL_CONNECTION = RAT_CONFIG.MYSQL_CONNECTION
