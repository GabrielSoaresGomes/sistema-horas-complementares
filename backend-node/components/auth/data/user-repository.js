const DatabaseConnector = require('./connector/database-connector');
const jwt = require('jsonwebtoken');


class UserRepository {
    constructor() {
        this.databaseConnetor = new DatabaseConnector();
        this.FIRST_ELEMENT_ARRAY = 0;
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
            return response.rows[this.FIRST_ELEMENT_ARRAY];
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
            return response.rows[this.FIRST_ELEMENT_ARRAY];
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
            return response.rows[this.FIRST_ELEMENT_ARRAY];
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

    validateToken(token) {
        return jwt.verify(token);
    }

    getTokenData(token) {
        return jwt.decode(token, {json: true});
    }

    async getUserByToken(token) {
        const connection = await this.databaseConnetor.generateConnection();
        const response = await connection.query(`
            SELECT id, course_id, name, email, token, is_logged, is_coordinator, registration, created_at
            FROM users
            WHERE token = $1
            AND deleted_at is null
        `, [token]);
        if (response?.rows?.length) {
            return response?.rows?.[this.FIRST_ELEMENT_ARRAY];
        }
        return false;
    }
}

module.exports = UserRepository;