const { Pool } = require('pg');


class DatabaseConnector {
    async configureConnection() {
        if(!global.databaseConnection) {
            global.databaseConnection = new Pool({
                user: process.env.DATABASE_POSTGRES_USER,
                host: process.env.DATABASE_POSTGRES_HOST,
                database: process.env.DATABASE_POSTGRES_NAME,
                password: process.env.DATABASE_POSTGRES_PASSWORD,
                port: process.env.DATABASE_POSTGRES_PORT,
                max: process.env.DATABASE_POSTGRES_CONNECTION_LIMIT
            });
        }

        return global.databaseConnection;
    }

    async generateConnection() {
        return Promise.resolve(this.configureConnection());
    }
}

module.exports = DatabaseConnector;