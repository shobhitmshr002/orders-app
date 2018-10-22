const path = require("path");
const express = require("express");
const httpError = require("http-errors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const routes = require("../routes/index.route");
const config = require("./config");
const passport = require("./passport");
var options = {
    swaggerOptions: {
        authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
    }
};
const app = express();

if (config.env === "development") {
    app.use(logger("dev"));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(passport.initialize());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument,options));
// API router
app.use("/", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new httpError(404);
    return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {

    // customize Joi validation errors
    if (err.isJoi) {
        err.message = err.details.map(e => e.message).join("; ");
        err.status = 400;
    }

    res.status(err.status || 500).json({
        error: err.message
    });
    next(err);
});

module.exports = app;
