require('dotenv').config()

export const SECRET = `${process.env.SECRET ?? ''}`
export const CLIENT_ID = `${process.env.CLIENT_ID ?? ''}`
export const GUILD_ID = `${process.env.GUILD_ID ?? ''}`
export const ROLE_IDS = `${process.env.ROLES ?? ''}`.split(',')