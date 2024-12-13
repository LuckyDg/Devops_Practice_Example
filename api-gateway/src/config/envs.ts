import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  AUTH_MICROSERVICE_HOST: string;
  AUTH_MICROSERVICE_PORT: number;
  SHIP_MICROSERVICE_HOST:string;
  SHIP_MICROSERVICE_PORT:number;
  RABBITMQ_HOST: string;
  RABBITMQ_PORT: number;
  RABBITMQ_USER: string;
  RABBITMQ_PASS: string;
}

const evnsSchema = joi
  .object({
    PORT: joi.number().required(),
    AUTH_MICROSERVICE_HOST: joi.string().required(),
    AUTH_MICROSERVICE_PORT: joi.number().required(),
    SHIP_MICROSERVICE_HOST: joi.string().required(),
    SHIP_MICROSERVICE_PORT: joi.number().required(),
    RABBITMQ_HOST: joi.string().required(),
    RABBITMQ_PORT: joi.number().required(),
    RABBITMQ_USER: joi.string().required(),
    RABBITMQ_PASS: joi.string().required(),
  })
  .unknown(true);

const { error, value } = evnsSchema.validate(process.env);

if (error) {
  throw new Error(`Config Validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  authMicroserviceHost: envVars.AUTH_MICROSERVICE_HOST,
  authMicroservicePort: envVars.AUTH_MICROSERVICE_PORT,
  shipMicroserviceHost: envVars.SHIP_MICROSERVICE_HOST,
  shipMicroservicePort: envVars.SHIP_MICROSERVICE_PORT,
  rabbitmq_host: envVars.RABBITMQ_HOST,
  rabbitmq_port: envVars.RABBITMQ_PORT,
  rabbitmq_user: envVars.RABBITMQ_USER,
  rabbitmq_pass: envVars.RABBITMQ_PASS,
};
