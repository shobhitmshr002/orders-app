const Joi = require("joi");

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require("dotenv").config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(["development", "production", "test", "provision"])
        .default("development"),
    SERVER_PORT: Joi.number()
        .default(8080),
    MONGOOSE_DEBUG: Joi.boolean()
        .when("NODE_ENV", {
            is: Joi.string().equal("development"),
            then: Joi.boolean().default(true),
            otherwise: Joi.boolean().default(false)
        }),
    maps_key:Joi.string()
        .default("AIzaSyCUCh9LR13qeyoK_AE9zVbUdY150MIa6mM"),
    JWT_SECRET: Joi.string()//.required()
        .description("JWT Secret required to sign")
        .default("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"),
    MONGO_HOST: Joi.string()//.required()
        .description("Mongo DB host url")
        .default("mongodb://localhost/test"),
    MONGO_PORT: Joi.number()
        .default(27017)
}).unknown()
    .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.SERVER_PORT,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    jwtSecret: envVars.JWT_SECRET,
    frontend: envVars.MEAN_FRONTEND || "angular",
    mongo: {
        host: envVars.MONGO_HOST,
        port: envVars.MONGO_PORT
    },
    google_maps_key:envVars.maps_key
};

module.exports = config;
