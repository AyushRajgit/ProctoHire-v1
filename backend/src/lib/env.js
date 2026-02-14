import dotenv from 'dotenv';

dotenv.config({quiet: true});
// quiet: true option hides the warning or the number of ENV variables that were loaded from the .env file. 

export const ENV = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV
}