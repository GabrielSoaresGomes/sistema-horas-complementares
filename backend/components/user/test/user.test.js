const User = require('../user');

afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
});

const userRepositoryMock = {
    getAllUsers: jest.fn(),
    getUser: jest.fn(),
    addUser: jest.fn(),
    editUser: jest.fn(),
    destroyUser: jest.fn(),
    verifyIfEmailAlreadyUsed: jest.fn(),
    verifyIfEmailAlreadyUsedForOtherUser: jest.fn(),
};

describe('Testes para a classe User', () => {
    describe('Testes para o método listAllUsers', () => {
        it('Listagem de todos os usuários, fluxo normal', async () => {
            const user = new User(userRepositoryMock);

            userRepositoryMock.getAllUsers.mockReturnValue([{
                name: 'junior',
                email: 'junior@email.com'
            }, {
                name: 'bernardo',
                email: 'bernardo@email.com'
            }]);

            const result = await user.listAllUsers();

            expect(result.getResult()).toStrictEqual([{
                name: 'junior',
                email: 'junior@email.com'
            }, {
                name: 'bernardo',
                email: 'bernardo@email.com'
            }]);
        });

        it('Erro na listagem de todos os usuários, fluxo de exceção', async () => {
            const user = new User(userRepositoryMock);

            userRepositoryMock.getAllUsers.mockImplementation(() => {
                throw new Error('erro');
            });

            const result = await user.listAllUsers();

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'GET_ERROR',
                message: 'Falha ao listar todos usuários'
            }]);
        });
    });

    describe('Testes para o método createUser', () => {
        it('Criando um usuário com sucesso, fluxo normal', async () => {
            const user = new User(userRepositoryMock);
            const userData = {
                course_id: 1,
                name: 'junior',
                password: '123',
                is_coordinator: false,
                registration: '1',
                email: 'junior@email.com'
            };

            userRepositoryMock.verifyIfEmailAlreadyUsed.mockReturnValue();

            userRepositoryMock.addUser.mockReturnValue({
                name: 'junior',
                email: 'junior@email.com'
            });

            const result = await user.createUser(userData);

            expect(result.getResult()).toStrictEqual({
                name: 'junior',
                email: 'junior@email.com'
            });
        });

        it('Criando um usuário sem o nome, fluxo alternativo', async () => {
            const user = new User(userRepositoryMock);
            const userData = {
                course_id: 1,
                name: null,
                password: '123',
                is_coordinator: false,
                registration: '1',
                email: 'junior@email.com'
            };

            userRepositoryMock.verifyIfEmailAlreadyUsed.mockReturnValue();

            userRepositoryMock.addUser.mockReturnValue({
                name: 'junior',
                email: 'junior@email.com'
            });

            const result = await user.createUser(userData);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'PARAMS_FAILED',
                message: 'Parâmetro senha, nome ou email faltando para adicionar um usuário'
            }]);
        });

        it('Criando um usuário sem a senha, fluxo alternativo', async () => {
            const user = new User(userRepositoryMock);
            const userData = {
                course_id: 1,
                name: 'junior',
                password: null,
                is_coordinator: false,
                registration: '1',
                email: 'junior@email.com'
            };

            userRepositoryMock.verifyIfEmailAlreadyUsed.mockReturnValue();

            userRepositoryMock.addUser.mockReturnValue({
                name: 'junior',
                email: 'junior@email.com'
            });

            const result = await user.createUser(userData);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'PARAMS_FAILED',
                message: 'Parâmetro senha, nome ou email faltando para adicionar um usuário'
            }]);
        });

        it('Criando um usuário com um email já utilizado, fluxo alternativo', async () => {
            const user = new User(userRepositoryMock);
            const userData = {
                course_id: 1,
                name: 'junior',
                password: '123',
                is_coordinator: false,
                registration: '1',
                email: 'junior@email.com'
            };

            const numberMock = 1;
            userRepositoryMock.verifyIfEmailAlreadyUsed.mockReturnValue(numberMock);

            userRepositoryMock.addUser.mockReturnValue({
                name: 'junior',
                email: 'junior@email.com'
            });

            const result = await user.createUser(userData);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'PARAMS_FAILED',
                message: 'O email inserido já está sendo utilizado!'
            }]);
        });

        it('Criando um usuário sem sucesso, fluxo alternativo', async () => {
            const user = new User(userRepositoryMock);
            const userData = {
                course_id: 1,
                name: 'junior',
                password: '123',
                is_coordinator: false,
                registration: '1',
                email: 'junior@email.com'
            };

            userRepositoryMock.verifyIfEmailAlreadyUsed.mockReturnValue();

            userRepositoryMock.addUser.mockReturnValue();

            const result = await user.createUser(userData);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'CREATE_ERROR',
                message: 'Houve uma falha ao adicionar um usuário'
            }]);
        });

        it('Erro ao criar um usuário, fluxo de exceção', async () => {
            const user = new User(userRepositoryMock);
            const userData = {
                course_id: 1,
                name: 'junior',
                password: '123',
                is_coordinator: false,
                registration: '1',
                email: 'junior@email.com'
            };

            userRepositoryMock.verifyIfEmailAlreadyUsed.mockImplementation(() => {
                throw new Error('erro');
            });

            userRepositoryMock.addUser.mockReturnValue({
                name: 'junior',
                email: 'junior@email.com'
            });

            const result = await user.createUser(userData);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'CREATE_ERROR',
                message: 'Falha ao criar um novo usuário'
            }]);
        });
    });

    describe('Testes para o método updateUser', () => {
        it('Atualizando um usuário com sucesso, fluxo normal', async () => {
            const user = new User(userRepositoryMock);
            const userData = {
                course_id: 1,
                name: 'junior',
                password: '123',
                is_coordinator: false,
                registration: '1',
                email: 'junior@email.com'
            };

            userRepositoryMock.verifyIfEmailAlreadyUsedForOtherUser.mockReturnValue();

            userRepositoryMock.getUser.mockReturnValue({
                password: 'MTIz'
            });


            userRepositoryMock.editUser.mockReturnValue({
                name: 'junior',
                email: 'junior@email.com'
            });

            const numberMock = 2;
            const result = await user.updateUser(userData, numberMock);

            expect(result.getResult()).toStrictEqual({
                name: 'junior',
                email: 'junior@email.com'
            });
        });

        it('Atualizando um usuário sem o email, fluxo alternativo', async () => {
            const user = new User(userRepositoryMock);
            const userData = {
                course_id: 1,
                name: 'junior',
                password: '123',
                is_coordinator: false,
                registration: '1',
                email: null
            };

            userRepositoryMock.verifyIfEmailAlreadyUsedForOtherUser.mockReturnValue();

            userRepositoryMock.getUser.mockReturnValue({
                password: 'MTIz'
            });

            userRepositoryMock.editUser.mockReturnValue({
                name: 'junior',
                email: 'junior@email.com'
            });

            const numberMock = 2;
            const result = await user.updateUser(userData, numberMock);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'PARAMS_FAILED',
                message: 'Parâmetro senha, nome ou email faltando para atualizar um usuário'
            }]);
        });

        it('Tentando atualizar um usuário que não foi encontrado, fluxo alternativo', async () => {
            const user = new User(userRepositoryMock);
            const userData = {
                course_id: 1,
                name: 'junior',
                password: '123',
                is_coordinator: false,
                registration: '1',
                email: 'junior@email.com'
            };

            userRepositoryMock.verifyIfEmailAlreadyUsedForOtherUser.mockReturnValue();

            userRepositoryMock.getUser.mockReturnValue();

            userRepositoryMock.editUser.mockReturnValue({
                name: 'junior',
                email: 'junior@email.com'
            });

            const numberMock = 2;
            const result = await user.updateUser(userData, numberMock);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'SEARCH_FAILED',
                message: 'Não foi possível encontrar o usuário com o id inserido'
            }]);
        });

        it('Atualizando um usuário com um email já utilizado, fluxo alternativo', async () => {
            const user = new User(userRepositoryMock);
            const userData = {
                course_id: 1,
                name: 'junior',
                password: '123',
                is_coordinator: false,
                registration: '1',
                email: 'junior@email.com'
            };

            const numberMock1 = 1;
            userRepositoryMock.verifyIfEmailAlreadyUsedForOtherUser.mockReturnValue(numberMock1);

            userRepositoryMock.getUser.mockReturnValue({
                password: 'MTIz'
            });

            userRepositoryMock.editUser.mockReturnValue({
                name: 'junior',
                email: 'junior@email.com'
            });

            const numberMock2 = 2;
            const result = await user.updateUser(userData, numberMock2);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'PARAMS_FAILED',
                message: 'O email inserido já está sendo utilizado!'
            }]);
        });

        it('Atualizando a senha de um usuário, fluxo alternativo', async () => {
            const user = new User(userRepositoryMock);
            const userData = {
                course_id: 1,
                name: 'junior',
                password: '1234',
                is_coordinator: false,
                registration: '1',
                email: 'junior@email.com'
            };

            userRepositoryMock.verifyIfEmailAlreadyUsedForOtherUser.mockReturnValue();

            userRepositoryMock.getUser.mockReturnValue({
                password: 'MTIz'
            });

            userRepositoryMock.editUser.mockReturnValue({
                name: 'junior',
                email: 'junior@email.com'
            });

            const numberMock = 2;
            const result = await user.updateUser(userData, numberMock);

            expect(result.getResult()).toStrictEqual({
                'email': 'junior@email.com',
                'name': 'junior'
            });
        });

        it('Atualizando um usuário sem sucesso, fluxo alternativo', async () => {
            const user = new User(userRepositoryMock);
            const userData = {
                course_id: 1,
                name: 'junior',
                password: '123',
                is_coordinator: false,
                registration: '1',
                email: 'junior@email.com'
            };

            userRepositoryMock.verifyIfEmailAlreadyUsedForOtherUser.mockReturnValue();

            userRepositoryMock.getUser.mockReturnValue({
                password: 'MTIz'
            });

            userRepositoryMock.editUser.mockReturnValue();

            const numberMock = 2;
            const result = await user.updateUser(userData, numberMock);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'UPDATE_ERROR',
                message: 'Houve uma falha ao atualizar o usuário'
            }]);
        });

        it('Erro ao atualizar um usuário, fluxo de exceção', async () => {
            const user = new User(userRepositoryMock);
            const userData = {
                course_id: 1,
                name: 'junior',
                password: '123',
                is_coordinator: false,
                registration: '1',
                email: 'junior@email.com'
            };

            userRepositoryMock.verifyIfEmailAlreadyUsedForOtherUser.mockImplementation(() => {
                throw new Error('erro');
            });

            userRepositoryMock.getUser.mockReturnValue({
                password: 'MTIz'
            });

            userRepositoryMock.addUser.mockReturnValue({
                name: 'junior',
                email: 'junior@email.com'
            });

            const numberMock = 2;
            const result = await user.updateUser(userData, numberMock);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'UPDATE_ERROR',
                message: 'Falha ao atualizar usuário'
            }]);
        });
    });

    describe('Testes para o método deleteUser', () => {
        it('Deletando um usuário com sucesso, fluxo normal', async () => {
            const user = new User(userRepositoryMock);

            const numberMock1 = 1;
            userRepositoryMock.destroyUser.mockReturnValue(numberMock1);

            const numberMock2 = 2;
            const result = await user.deleteUser(numberMock2);

            const numberExpected = 1;
            expect(result.getResult()).toStrictEqual(numberExpected);
        });

        it('Tentando deletar um usuário que não foi encontrado, fluxo alternativo', async () => {
            const user = new User(userRepositoryMock);

            const numberMock = 1;
            userRepositoryMock.destroyUser.mockReturnValue(numberMock);

            const result = await user.deleteUser();

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'PARAMS_FAILED',
                message: 'O id undefined não é válido para apagar um usuário'
            }]);
        });

        it('Deletando um usuário sem sucesso, fluxo alternativo', async () => {
            const user = new User(userRepositoryMock);

            userRepositoryMock.destroyUser.mockReturnValue();

            const numberMock = 2;
            const result = await user.deleteUser(numberMock);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'DELETE_ERROR',
                message: 'Houve uma falha ao apagar o usuário'
            }]);
        });

        it('Erro ao deletar um usuário, fluxo de exceção', async () => {
            const user = new User(userRepositoryMock);

            userRepositoryMock.destroyUser.mockImplementation(() => {
                throw new Error('erro');
            });

            const numberMock = 2;
            const result = await user.deleteUser(numberMock);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'DELETE_ERROR',
                message: 'Falha ao tentar apagar usuário com id 2, error: Error: erro'
            }]);
        });

    });
});
