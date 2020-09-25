import Sequelize from 'sequelize'
import { logger } from '../constants.js'
import { MYSQL_CONNECTION } from '../secrets.js'

const db = new Sequelize(MYSQL_CONNECTION.db, MYSQL_CONNECTION.user, MYSQL_CONNECTION.pass, {
  host: MYSQL_CONNECTION.host,
  dialect: 'mysql',
  define: {
    underscored: true
  },
  logging: (str) => {
    logger.child({ sql: str }).info()
  }
})

db.authenticate()
  .then(() => logger.info('Database connection has been established successfully'))
  .catch(err => logger.error('Unable to connect to the database: %s', err))

export default db
