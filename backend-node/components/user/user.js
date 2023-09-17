const ResultValidation = require('./entity/result-validation');
const env = require('../../environment-validation');
const { Buffer } = require('node:buffer');


class User {
    constructor(usersRepository) {
        this.userRepository = usersRepository;
    }
    async listAllUsers() {
        const resultValidation = new ResultValidation();
        try {
            const response = await this.userRepository.getAllUsers();
            resultValidation.setResult(response);
        } catch (error) {
            console.log(`Falha ao listar todos usuários, error: ${error}`);
            resultValidation.addError('GET_ERROR', 'Falha ao listar todos usuários', true);
        }
        return resultValidation;
    }

    async createUser(userData) {
        const resultValidation = new ResultValidation();
        try {
            if (this.#verifyUserParams(userData)) {
                resultValidation.addError('PARAMS_FAILED', 'Parâmetro senha ou nome faltando para adicionar um usuário', false);
                return resultValidation;
            }

            userData.password = Buffer.from(userData.password).toString('base64');

            const response = await this.userRepository.addUser(userData);
            if (response) {
                console.log(`Usuário adicionado com sucesso, com os seguintes dados: ${JSON.stringify(response)}`);
                resultValidation.setResult(response);
            } else {
                console.log(`Ocorreu um erro ao tentar adicionar um usuário com os seguintes dados: ${JSON.stringify(userData)}`);
                resultValidation.addError('CREATE_ERROR', 'Houve uma falha ao adicionar um usuário', false);
            }
            resultValidation.setResult(response);
        } catch (error) {
            console.log(`Falha ao criar um novo usuário com os seguintes dados: ${JSON.stringify(userData)}, error: ${error}`);
            resultValidation.addError('CREATE_ERROR', 'Falha ao criar um novo usuário', true);
        }
        return resultValidation;
    }

    async updateUser(userData, userId) {
        const resultValidation = new ResultValidation();
        try {
            if (this.#verifyUserParams(userData)) {
                resultValidation.addError('PARAMS_FAILED', 'Parâmetro senha ou nome faltando para atualizar um usuário', false);
                return resultValidation;
            }

            const user = this.userRepository.getUser(userId);
            const oldPassword = Buffer.from(user.password, 'base64').toString('utf8');

            if (userData.password !== oldPassword){
                userData.password = Buffer.from(userData.password).toString('base64');
            }

            const response = await this.userRepository.editUser(userData, userId);
            if (response) {
                console.log(`Usuário atualizado com sucesso, com os seguintes dados: ${JSON.stringify(response)}`);
                resultValidation.setResult(response);
            } else {
                console.log(`Ocorreu um erro ao tentar atualizar o usuário de id ${userId} com os seguintes dados: ${JSON.stringify(userData)}`);
                resultValidation.addError('CREATE_ERROR', 'Houve uma falha ao atualizar o usuário', false);
            }
            resultValidation.setResult(response);
        } catch (error) {
            console.log(`Falha ao atualizar um o usuário de id ${userId} com os seguintes dados: ${JSON.stringify(userData)}, error: ${error}`);
            resultValidation.addError('UPDATE_ERROR', 'Falha ao atualizar usuário', true);
        }
        return resultValidation;
    }

    #verifyUserParams(userData) {
        let hasError = false;
        if (userData?.name == null) {
            hasError = true;
            console.log('É necessário informar o nome do usuário para realizar a criação');
        } else if(userData?.password == null) {
            hasError = true;
            console.log('É necessário informar a senha para realizar a criação do usuário');
        }
        return hasError;
    }
}

module.exports = User;