const DatabaseConnector = require('./connector/database-connector');


class ActivityRepository{

    constructor() {
        this.databaseConnector = new DatabaseConnector();
        this.FIRST_ELEMENT_ARRAY = 0;
    }

    async addActivity(activityData) {
        const connection = await this.databaseConnector.generateConnection();
        const response = await connection.query(`
            INSERT INTO activities (name, description, type, hours_added)
            VALUES($1, $2, $3, $4)
            RETURNING id, name, description, type, hours_added, created_at
        `, [activityData.name, activityData.description, activityData.type, activityData.hours_added]);

        if (response?.rows.length){
            return response.rows[this.FIRST_ELEMENT_ARRAY];
        }
        return false;
    }

    async getActivity(activityId){
        const connection = await this.databaseConnector.generateConnection();
        const response = await connection.query(`
            SELECT id, name, description, type, hours_added, created_at
            FROM activities
            WHERE deleted_at is null
            AND id = $1
        `, [activityId]);

        if (response?.rows?.length){
            return response.rows[this.FIRST_ELEMENT_ARRAY];
        }

        return false;
    }

    async getAllActivities(){
        const connection = await this.databaseConnector.generateConnection();
        const response = await connection.query(`
            SELECT id, name, description, type, hours_added, created_at
            FROM activities
            WHERE deleted_at is null
        `);

        return response.rows;
    }

    async destroyActivity(activityId){
        const connection = await this.databaseConnector.generateConnection();
        const response = await connection.query(`
            UPDATE activities
            SET deleted_at = now()
            WHERE id = $1
            AND deleted_at is null
            RETURNING id
        `, [activityId]);
        if (response?.rows?.length){
            return response.rows[this.FIRST_ELEMENT_ARRAY];
        }
        return null;
    }

    async editActivity(activityId, activityData){
        const connection = await this.databaseConnector.generateConnection();
        const response = await connection.query(`
            UPDATE activities
            SET name = $1, description = $2, type = $3, hours_added = $4
            WHERE deleted_at is null
            AND id = $5
            RETURNING id, name, description, type, hours_added
        `, [activityData.name, activityData.description, activityData.type, activityData.hours_added, activityId]);
        if (response?.rows?.length){
            return response.rows[this.FIRST_ELEMENT_ARRAY];
        }
        return null;
    }
}


module.exports = ActivityRepository;