import { config } from 'dotenv';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

export const ROOT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
export const EnvironmentEnum = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
};
export const IS_PRODUCTION = process.env.NODE_ENV === EnvironmentEnum.PRODUCTION
export const configFilePath = IS_PRODUCTION ? '.env.prodcution' : '.env.development'

config({ path: configFilePath })