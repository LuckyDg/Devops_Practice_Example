import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;
  JWT_SECRET: string;
}

const evnsSchema = joi
  .object({
    PORT: joi.number().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USER: joi.string().required(),
    DB_PASS: joi.string().required(),
    DB_NAME: joi.string().required(),
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true);

const { error, value } = evnsSchema.validate(process.env);

if (error) {
  throw new Error(`Config Validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  db_host: envVars.DB_HOST,
  db_port: envVars.DB_PORT,
  db_user: envVars.DB_USER,
  db_pass: envVars.DB_PASS,
  db_name: envVars.DB_NAME,
  jwtSecret: envVars.JWT_SECRET,

};
