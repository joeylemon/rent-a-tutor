import pino from 'pino'

// A custom logger
export const logger = pino()

// The amount of time (in seconds) that an API token will expire after it was issued
export const API_TOKEN_EXPIRE_TIME = 2592000
