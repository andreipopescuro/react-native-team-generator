// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Game } = initSchema(schema);

export {
  User,
  Game
};