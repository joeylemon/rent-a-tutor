import Sequelize from 'sequelize'
import { MYSQL_CONNECTION } from '../secrets.js'

const db = new Sequelize(MYSQL_CONNECTION.db, MYSQL_CONNECTION.user, MYSQL_CONNECTION.pass, {
    host: MYSQL_CONNECTION.host,
    dialect: 'mysql',
    define: {
        underscored: true
    }
})

db.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err))

export default db