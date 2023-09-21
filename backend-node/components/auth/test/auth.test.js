const Auth = require('../auth');

afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
});

const userRepositoryMock = {
    getUser: jest.fn(),
    getUserById: jest.fn(),
    setStatusUser: jest.fn(),
    setToken: jest.fn()
};

//falta só adicionar o JWT_KEY que é passado no construtor como crls passo isso aqui

describe('Testes para a classe Auth', () => {
    describe('Testes para o método login', () => {
        it('Login efetuado com sucesso retornando token, fluxo normal', async () => {
            process.env.JWT_KEY = '12345';
            const auth = new Auth(userRepositoryMock);
            const userData = {
                email: 'junior@email.com',
                password: '123'
            };

            userRepositoryMock.getUser.mockReturnValue({
                email: 'junior@email.com',
                password: 'MTIz'
            });

            const result = await auth.login(userData);

            expect(result.getResult()).toHaveProperty('token');
        });

        it('Verifica se existe o usuário no banco retorna false, fluxo alternativo', async () => {
            process.env.JWT_KEY = '12345';
            const auth = new Auth(userRepositoryMock);
            const userData = {
                email: 'junior@email.com',
                password: '123'
            };

            userRepositoryMock.getUser.mockReturnValue(false);

            const result = await auth.login(userData);

            expect(result.getResult()).toBeFalsy();
            expect(result.getErrorList()).toStrictEqual([{
                'message': 'Não foi possível encontrar o usuário pelo email',
                'tag': 'SEARCH_FAILED'
            }]);
        });

        it('Verifica se o email do usuário corresponde com o email no banco, fluxo alternativo', async () => {
            process.env.JWT_KEY = '12345';
            const auth = new Auth(userRepositoryMock);
            const userData = {
                email: 'junior@email.com',
                password: '123'
            };

            userRepositoryMock.getUser.mockReturnValue({
                email: 'bernardo@email.com',
                password: 'MTIz'
            });

            const result = await auth.login(userData);

            expect(result.getResult()).toBeFalsy();
            expect(result.getErrorList()).toStrictEqual([{
                'message': 'Credencias inválidas',
                'tag': 'AUTH_FAILED'
            }]);
        });

        it('Verifica se a senha do usuário corresponde com a senha no banco, fluxo alternativo', async () => {
            process.env.JWT_KEY = '12345';
            const auth = new Auth(userRepositoryMock);
            const userData = {
                email: 'junior@email.com',
                password: '123'
            };

            userRepositoryMock.getUser.mockReturnValue({
                email: 'junior@email.com',
                password: 'MTIzNA=='
            });

            const result = await auth.login(userData);

            expect(result.getResult()).toBeFalsy();
            expect(result.getErrorList()).toStrictEqual([{
                'message': 'Credencias inválidas',
                'tag': 'AUTH_FAILED'
            }]);
        });

        it('Erro ao efetuar o login, fluxo de exceção', async () => {
            process.env.JWT_KEY = '12345';
            const auth = new Auth(userRepositoryMock);
            const userData = {
                email: 'junior@email.com',
                password: '123'
            };

            userRepositoryMock.getUser.mockImplementation(() => {
                throw new Error('erro');
            });

            const result = await auth.login(userData);

            expect(result.getResult()).toBeFalsy();
            expect(result.getErrorList()).toStrictEqual([{
                'message': 'Falha ao logar',
                'tag': 'LOGIN_ERROR'
            }]);
        });

    });

    describe('Testes para o método logout', () => {
        it('Logout efetuado com sucesso, fluxo normal', async () => {
            process.env.JWT_KEY = '12345';
            const auth = new Auth(userRepositoryMock);

            userRepositoryMock.getUserById.mockReturnValue({
                is_logged: true
            });
            const userId = 2;
            const result = await auth.logout(userId);

            expect(result.getResult()).toStrictEqual({
                'message': 'Usuário deslogado com sucesso'
            });
        });

        it('Verifica se userId foi passado, fluxo alternativo', async () => {
            process.env.JWT_KEY = '12345';
            const auth = new Auth(userRepositoryMock);

            userRepositoryMock.getUserById.mockReturnValue({
                is_logged: true
            });

            const result = await auth.logout();

            expect(result.getErrorList()).toStrictEqual([{
                'tag': 'PARAMS_FAILED',
                'message': 'O id informando para o usuário não é válido'
            }]);
        });

        it('Verifica se usuário com o id passado existe, fluxo alternativo', async () => {
            process.env.JWT_KEY = '12345';
            const auth = new Auth(userRepositoryMock);

            userRepositoryMock.getUserById.mockReturnValue(false);

            const userId = 2;
            const result = await auth.logout(userId);

            expect(result.getErrorList()).toStrictEqual([{
                'tag': 'SEARCH_FAILED',
                'message': 'Não foi possível encontrar um usuário com o id informado'
            }]);
        });

        it('Verifica se usuário com o id passado existe, fluxo alternativo', async () => {
            process.env.JWT_KEY = '12345';
            const auth = new Auth(userRepositoryMock);

            userRepositoryMock.getUserById.mockReturnValue({
                is_logged: false
            });

            const userId = 2;
            const result = await auth.logout(userId);

            expect(result.getErrorList()).toStrictEqual([{
                'tag': 'LOGOUT_FAILED',
                'message': 'Usuário já esta deslogado'
            }]);
        });

        it('Verifica se usuário com o id passado existe, fluxo alternativo', async () => {
            process.env.JWT_KEY = '12345';
            const auth = new Auth(userRepositoryMock);

            userRepositoryMock.getUserById.mockImplementation(() => {
                throw new Error('erro');
            });

            const userId = 2;
            const result = await auth.logout(userId);

            expect(result.getErrorList()).toStrictEqual([{
                'tag': 'LOGOUT_ERROR',
                'message': 'Falha ao fazer logout'
            }]);
        });
    });
});
