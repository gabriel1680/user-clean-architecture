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
        type: process.env.DB_TYPE || "postgres",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        username: process.env.DB_USERNAME || "appraisalAdmin",
        password: process.env.DB_PASSWORD || "123",
        database: process.env.DB_NAME || "appraisalCA",
        dropSchema: process.env.DB_DROP === "true",
        synchronize: process.env.DB_SYNCHRONIZE === "true",
        logging: process.env.DB_LOGGING === "true",
    },
    jwt: {
        secretKey: process.env.JWT_KEY || "Z2FicmllbG5sd3ZhbG9yaXph",
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
    mail: {
        nodemailer: {
            host: process.env.NODEMAILER_HOST || "smtp.ethereal.email",
            port: process.env.NODEMAILER_PORT || 587,
            secure: process.env.NODEMAILER_SECURE === "true",
            auth: {
                user:
                    process.env.NODEMAILER_USER || "scot.muller@ethereal.email",
                pass: process.env.NODEMAILER_PASSWORD || "NUqzF7Mf464kn39wkA",
            },
        },
        defaultSender: {
            name: {
                firstName:
                    process.env.DEFAULT_MAIL_SENDER_FIRST_NAME || "gabriel",
                lastName: process.env.DEFAULT_MAIL_SENDER_LAST_NAME || "lopes",
            },
            address:
                process.env.DEFAULT_MAIL_SENDER_ADDRESS ||
                "gabriel.lopes16@hotmail.com",
        },
    },
    imageStorage: {
        apiKey: process.env.IMG_API_KEY || "92193d1d9712c928a1497d9379646230",
        url: process.env.IMG_UPLOAD_URL || "https://api.imgbb.com/1/upload",
    },
};

export const { app } = config;
export const { db } = config;
export const { jwt } = config;
export const { mail } = config;
export const { imageStorage } = config;
