const DatabaseConnector = require('./connector/database-connector');


class UserRepository {
    constructor() {
        this.databaseConnetor = new DatabaseConnector();
    }

    async getAllUsers() {
        const connection = await this.databaseConnetor.generateConnection();
        const response = await connection.query(`
            SELECT id, course_id, name, password, is_coordinator, registration, created_at
            FROM users
            WHERE deleted_at is null
        `);
        return response.rows;
    }

    async getUser(userId) {
        const connection = await this.databaseConnetor.generateConnection();
        const response = await connection.query(`
            SELECT id, course_id, name, password, is_coordinator, registration, created_at
            FROM users
            WHERE deleted_at is null
            AND id = $1
        `, [userId]);

        if (response?.rows?.length) {
            return response.rows[0];
        }
        return false;
    }

    async addUser(userData) {
        const connection = await this.databaseConnetor.generateConnection();
        const response = await connection.query(`
            INSERT INTO users (course_id, name, password, is_coordinator, registration, email)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, course_id, name, email, password, is_coordinator, registration, created_at
        `, [userData?.course_id, userData?.name, userData?.password, userData?.is_coordinator, userData?.registration, userData?.email]);
        if (response?.rows?.length) {
            return response.rows[0];
        }
        return null;
    }

    async editUser(userData, userId) {
        const connection = await this.databaseConnetor.generateConnection();
        const response = await connection.query(`
            UPDATE users
            SET name = $1, password = $2, course_id = $3, is_coordinator = $4, registration = $5, email = $6
            WHERE deleted_at is null
            AND id = $7
            RETURNING id, course_id, name, password, is_coordinator, registration, created_at
        `, [userData?.name, userData?.password, userData?.course_id, userData?.is_coordinator, userData?.registration, userData?.email, userId]);
        if (response?.rows?.length) {
            return response.rows[0];
        }
        return null;
   }

    async destroyUser(userId) {
        const connection = await this.databaseConnetor.generateConnection();
        const response = await connection.query(`
            UPDATE users
            SET deleted_at = now()
            WHERE id = $1
            AND deleted_at is null
            RETURNING id
        `, [userId]);
        if (response?.rows?.length) {
            return response.rows[0];
        }
        return null;
    }

    async verifyIfEmailAlreadyUsed(userEmail) {
        const connection = await this.databaseConnetor.generateConnection();
        const response = await connection.query(`
            SELECT id
            FROM users
            WHERE email = $1
            AND deleted_at is null
        `, [userEmail]);

        return response?.rows?.length;
    }

    async verifyIfEmailAlreadyUsedForOtherUser(userEmail, userId) {
        const connection = await this.databaseConnetor.generateConnection();
        const response = await connection.query(`
            SELECT id
            FROM users
            WHERE email = $1
            AND id != $2
            AND deleted_at is null
        `, [userEmail, userId]);

        return response?.rows?.length;
    }
}

module.exports = UserRepository;