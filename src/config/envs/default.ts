// Custom file imports
import {
  MenuOptionEntity,
  RoleEntity,
  RoleMenuOptionEntity,
  UserAppEntity,
  UserAppTypeEntity,
} from '@entities';

export const config = {
  db: {
    entities: [
      MenuOptionEntity,
      RoleEntity,
      RoleMenuOptionEntity,
      UserAppEntity,
      UserAppTypeEntity,
    ],
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: process.env.DB_SCHEMA,
  },
};
