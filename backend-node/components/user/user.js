const ResultValidation = require('../../entity/result-validation');
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
                resultValidation.addError('PARAMS_FAILED', 'Parâmetro senha, nome ou email faltando para adicionar um usuário', false);
                return resultValidation;
            }

            const userEmailAlreadyUsed = await this.userRepository.verifyIfEmailAlreadyUsed(userData?.email);
            if (userEmailAlreadyUsed) {
                console.log(`O email ${userData?.email} já está sendo utilizado!`);
                resultValidation.addError('PARAMS_FAILED', 'O email inserido já está sendo utilizado!');
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
                resultValidation.addError('PARAMS_FAILED', 'Parâmetro senha, nome ou email faltando para atualizar um usuário', false);
                return resultValidation;
            }

            const userEmailAlreadyUsed = await this.userRepository.verifyIfEmailAlreadyUsedForOtherUser(userData?.email, userId);
            if (userEmailAlreadyUsed) {
                console.log(`O email ${userData?.email} já está sendo utilizado!`);
                resultValidation.addError('PARAMS_FAILED', 'O email inserido já está sendo utilizado!');
                return resultValidation;
            }

            const user = await this.userRepository.getUser(userId);
            if (!user) {
                resultValidation.addError('SEARCH_FAILED', 'Não foi possível encontrar o usuário com o id inserido', false);
                console.log(`Não foi possível encontrar o usuário com id: ${userId}`);
                return resultValidation;
            }

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
                resultValidation.addError('UPDATE_ERROR', 'Houve uma falha ao atualizar o usuário', false);
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
            console.log('É necessário informar o nome para o usuário');
        } else if(userData?.password == null) {
            hasError = true;
            console.log('É necessário informar a senha para o usuário');
        } else if(userData?.email == null) {
            hasError = true;
            console.log('É necessário informar um email para o usuário');
        }
        return hasError;
    }

    async deleteUser(userId) {
        const resultValidation = new ResultValidation();
        try {
            if (!userId) {
                console.log(`Id ${userId} é inválido para apagar um usuário!`);
                resultValidation.addError('PARAMS_FAILED', `O id ${userId} não é válido para apagar um usuário`, false);
            }
            const response = await this.userRepository.destroyUser(userId);
            if (response) {
                console.log(`Usuário de id ${userId} apagado com sucesso`);
                resultValidation.setResult(response);
            } else {
                console.log(`Ocorreu um erro ao tentar apagar o usuário de id ${userId}`);
                resultValidation.addError('DELETE_ERROR', 'Houve uma falha ao apagar o usuário', false);
            }
        } catch (error) {
            console.log(`Falha ao apagar usuário com id ${userId}`);
            resultValidation.addError('DELETE_ERROR', `Falha ao tentar apagar usuário com id ${userId}, error: ${error}`);
        }
        return resultValidation;
    }
}

module.exports = User;