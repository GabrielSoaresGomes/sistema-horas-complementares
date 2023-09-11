const DatabaseConnector = require('./connector/database-connector');


class UserRepository {
    constructor() {
        this.databaseConnetor = new DatabaseConnector();
    }
}

module.exports = UserRepository;