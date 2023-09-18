const DatabaseConnector = require('./connector/database-connector');


class UserRepository {
    constructor() {
        this.databaseConnetor = new DatabaseConnector();
    }

    async getUser(email) {
        const connection = await this.databaseConnetor.generateConnection();
        const response = await connection.query(`
            SELECT id, email, password
            FROM users
            WHERE deleted_at is null
            AND email = $1
        `, [email]);
        if (response?.rows?.length) {
            return response.rows[0];
        }
        return false;
    }

    async getUserById(userId) {
        const connection = await this.databaseConnetor.generateConnection();
        const response = await connection.query(`
            SELECT id, is_logged
            FROM users
            WHERE deleted_at is null
            AND id = $1
        `, [userId]);
        if (response?.rows?.length) {
            return response.rows[0];
        }
        return false;
    }
    
    async setStatusUser(status, userId) {
        const connection = await this.databaseConnetor.generateConnection();
        const response = await connection.query(`
            UPDATE users
            SET is_logged = $1
            WHERE deleted_at is null
            AND id = $2
        `, [status, userId]);
        if (response?.rows?.length) {
            return response.rows[0];
        }
        return null;
    }

    async setToken(token, userId) {
        const connection = await this.databaseConnetor.generateConnection();
        const response = await connection.query(`
            UPDATE users
            SET token = $1
            WHERE deleted_at is null
            AND id = $2
        `, [token, userId]);
        return response?.rows;
    }
}

module.exports = UserRepository;