const DatabaseConnector = require('./connector/database-connector');


class CourseRepository {
    constructor() {
        this.databaseConnector = new DatabaseConnector();
        this.FIRST_ELEMENT_ARRAY = 0;
    }

    async getCourses() {
        const connection = await this.databaseConnector.generateConnection();
        const response = await connection.query(`
            SELECT id, name, code, created_at
            FROM courses
            WHERE deleted_at IS NULL
        `);
        return response?.rows;
    }

    async getCourseById(id) {
        const connection = await this.databaseConnector.generateConnection();
        const response = await connection.query(`
            SELECT id, name, code, created_at
            FROM courses
            WHERE id = $1 
            AND deleted_at IS NULL
        `, [id]);
        return response?.rows?.[this.FIRST_ELEMENT_ARRAY];
    }

    async addCourse(courseData) {
        const connection = await this.databaseConnector.generateConnection();
        const response = await connection.query(`
            INSERT INTO courses (name, code)
            VALUES ($1, $2)
            RETURNING id, name, code, created_at
        `, [courseData?.name, courseData?.code]);
        return response?.rows?.[this.FIRST_ELEMENT_ARRAY];
    }

    async updateCourseById(courseData, courseId) {
        const connection = await this.databaseConnector.generateConnection();
        const response = await connection.query(`
            UPDATE courses
            SET name = $1, code = $2
            WHERE id = $3
            AND deleted_at IS NULL
            RETURNING id, name, code, created_at
        `, [courseData?.name, courseData?.code, courseId]);
        return response?.rows?.[this.FIRST_ELEMENT_ARRAY];
    }

    async deleteCourseById(courseId){
        const connection = await this.databaseConnector.generateConnection();
        const response = await connection.query(`
            UPDATE courses
            SET deleted_at = NOW()
            WHERE id = $1
            AND deleted_at IS NULL
            RETURNING id
        `, [courseId]);
        return response?.rows?.[this.FIRST_ELEMENT_ARRAY];
    }
}

module.exports = CourseRepository;