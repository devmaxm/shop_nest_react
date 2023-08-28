require('dotenv').config()

export const DB_HOST: string = process.env.DB_HOST
export const DB_PORT: number = parseInt(process.env.DB_PORT)
export const DB_USERNAME: string = process.env.DB_USERNAME
export const DB_PASSWORD: string = process.env.DB_PASSWORD
export const DATABASE: string = process.env.DATABASE

export const BCRYPT_SALT: number = parseInt(process.env.BCRYPT_SALT)

export const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY

export const SESSION_SECRET: string = process.env.SESSION_SECRET

export const CLIENT_DOMAIN: string = process.env.CLIENT_DOMAIN
