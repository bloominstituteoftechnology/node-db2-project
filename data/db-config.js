import knex from 'knex'
import config from '../knexfile'

export const dbConfig = knex(config.development)