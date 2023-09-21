const ResultValidation = require('../../entity/result-validation');
const jwt = require('jsonwebtoken');
const { Buffer } = require('node:buffer');


class Auth {
    constructor(usersRepository) {
        this.userRepository = usersRepository;
        this.jwtKey = process.env.JWT_KEY;
    }
    
    async login(userData) {
        const resultValidation = new ResultValidation();
        try {
            const user = await this.userRepository.getUser(userData?.email, userData?.password);
            if (!user) {
                resultValidation.addError('SEARCH_FAILED', 'Não foi possível encontrar o usuário pelo email', false);
                console.log(`Não foi possível encontrar o usuário com email: ${userData?.email}`);
                return resultValidation;
            }
            const passwordDecoded = Buffer.from(user.password, 'base64').toString('utf8');

            if (user?.email === userData?.email && passwordDecoded === userData?.password) {
                const token = jwt.sign({
                    email: userData?.email,
                    password: userData?.password
                }, this.jwtKey);
                await this.userRepository.setStatusUser(true, user?.id);
                await this.userRepository.setToken(token, user?.id);
                resultValidation.setResult({token});
            } else {
                resultValidation.addError('AUTH_FAILED', 'Credencias inválidas');
                console.log('As credencias inseridas estão inválidas!');
            }
        } catch (error) {
            console.log(`Falha ao fazer login, error: ${error}`);
            resultValidation.addError('LOGIN_ERROR', 'Falha ao logar', true);
        }
        return resultValidation;
    }
    
    async logout(userId) {
        const resultValidation = new ResultValidation();
        try {
            if (!userId) {
                console.log(`Id do usuário ${userId} não é válido!`);
                resultValidation.addError('PARAMS_FAILED', 'O id informando para o usuário não é válido');
                return resultValidation;
            }
            const user = await this.userRepository.getUserById(userId);
            if (!user) {
                console.log(`Não foi possível encontrar um usuário com o id ${userId}`);
                resultValidation.addError('SEARCH_FAILED', 'Não foi possível encontrar um usuário com o id informado');
                return resultValidation;
            }

            if (user?.is_logged === true) {
                await this.userRepository.setStatusUser(false, userId);
                await this.userRepository.setToken(null, userId);
                resultValidation.setResult({ message: 'Usuário deslogado com sucesso' });
            } else {
                console.log(`Usuário de id ${userId} já está deslogado`);
                resultValidation.addError('LOGOUT_FAILED', 'Usuário já esta deslogado');
                return resultValidation;
            }
            
        } catch (error) {
            console.log(`Falha ao fazer logout, error: ${error}`);
            resultValidation.addError('LOGOUT_ERROR', 'Falha ao fazer logout', true);
        }
        return resultValidation;
    }

    async authenticate(token) {
        const resultValidation = new ResultValidation();
        try {
            const userData = await this.userRepository.getUserByToken(token);
            if (!userData) {
                resultValidation.addError('INVALID_TOKEN', 'Não foi possível encontrar dados com o token informado');
                console.log(`Não foi possível encontrar dados com o token ${token}`);
                return resultValidation;
            }

            const isTokenValid = this.userRepository.validateToken(token);
            if (!isTokenValid) {
                resultValidation.addError('INVALID_TOKEN', 'O token informando não é válido!');
                console.log(`O token ${token} não é válido`);

                await this.userRepository.setStatusUser(false, userData?.id);
                await this.userRepository.setToken(null, userData?.id);
                return resultValidation;
            }

            const tokenData = this.userRepository.getTokenData(token);
            const tokenOwnerEmail = tokenData?.email;

            if (tokenOwnerEmail !== userData?.email) {
                resultValidation.addError('VALIDATE_ERROR', 'Credenciais do token não conferem com dados do usuário');
                console.log(`O email do token: ${tokenOwnerEmail} é diferente do email no banco: ${userData?.email}`);
                return resultValidation;
            }
            resultValidation.setResult(userData);

        } catch (error) {
            console.log(`Falha ao autenticar token. Error: ${error}`);
            resultValidation.addError('VALIDATE_ERROR', 'Falha ao validar token', true);
        }
        return resultValidation;
    }
}

module.exports = Auth;