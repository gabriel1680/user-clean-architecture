import dotEnv from "dotenv";

dotEnv.config({
    path: process.env.ENVIRONMENT === "production" ? ".env" : "stage.env",
});

const config = {
    app: {
        port: process.env.SERVER_PORT || 3000,
        base_url: process.env.BASE_URL || "http://localhost:3333",
        frontend_url: process.env.FRONTEND_URL || "http://localhost:3000",
        env: process.env.ENVIRONMENT,
    },
    db: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        dropSchema: process.env.DB_DROP === "true",
        synchronize: process.env.DB_SYNCHRONIZE === "true",
        logging: process.env.DB_LOGGING === "true",
    },
    jwt: {
        secretKey: process.env.JWT_KEY,
        expiresIn: process.env.JWT_EXPIRES_IN,
    },
    mail: {
        nodemailer: {
            host: process.env.NODEMAILER_HOST,
            port: process.env.NODEMAILER_PORT,
            secure: process.env.NODEMAILER_SECURE === "true",
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        },
        defaultSender: {
            name: {
                firstName: process.env.DEFAULT_MAIL_SENDER_FIRST_NAME,
                lastName: process.env.DEFAULT_MAIL_SENDER_LAST_NAME,
            },
            address: process.env.DEFAULT_MAIL_SENDER_ADDRESS,
        },
    },
    imageStorage: {
        apiKey: process.env.IMG_API_KEY,
        url: process.env.IMG_UPLOAD_URL,
    },
};

export const { app } = config;
export const { db } = config;
export const { jwt } = config;
export const { mail } = config;
export const { imageStorage } = config;
