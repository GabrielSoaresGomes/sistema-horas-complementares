const ResultValidation = require('./entity/result-validation');
const env = require('../../environment-validation');


class Users {
    constructor(usersRepository) {
        this.userRepository = usersRepository;
    }

    async testComponent() {
        const resultValidation = new ResultValidation();
        try {
            resultValidation.setResult({ message: 'OK' });
        } catch (error) {
            resultValidation.addError('TEST_ERROR', 'Mensagem erro falha', true);
        }
        return resultValidation;
    }
}

module.exports = Users;