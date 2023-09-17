const DatabaseConnector = require('./connector/database-connector');


class UserRepository {
    constructor() {
        this.databaseConnetor = new DatabaseConnector();
    }

    async getUser(email, password) {
        const connection = await this.databaseConnetor.generateConnection();
        const response = await connection.query(`
            SELECT id, email, password
            FROM users
            WHERE deleted_at is null
            AND email = $1
            AND password = $2
        `, [email, password]);

        return response.rows;
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
}

module.exports = UserRepository;