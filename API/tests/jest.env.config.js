const env = process.env.NODE_ENV.toLowerCase().trim();
let envFile = ".env";

if (env == 'production' || env == "prd" || env == "prod")
    envFile = ".env";
else
    envFile = `.env.${env}`;

require("dotenv").config({
    path: envFile
}); 