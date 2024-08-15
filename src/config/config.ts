import dotenv = require('dotenv');
dotenv.config();

export const merchantsUrl: string = process.env.MERCHANTS_URL;
export const usersUrl: string = process.env.USERS_URL;
export const payersUrl: string = process.env.PAYERS_URL;
export const port: string = process.env.PORT;
