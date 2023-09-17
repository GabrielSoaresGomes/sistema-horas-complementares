const ResultValidation = require('./entity/result-validation');
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
            const passwordEncoded = Buffer.from(user.password, 'base64').toString('utf8');

            if (user?.email === userData?.email && passwordEncoded === userData?.password) {
                const token = jwt.sign({
                    email: userData?.email,
                    password: userData?.password
                }, this.jwtKey)
                await this.userRepository.setStatusUser(true, user?.id);
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
            const user = await this.userRepository.getUser(email, password);

            if (user.status === 0) {
                const status = await this.userRepository.setStatusUser(0, userId);
            };
            
        } catch (error) {
            console.log(`Falha ao fazer logout, error: ${error}`);
            resultValidation.addError('LOGOUT_ERROR', 'Falha ao fazer logout', true);
        }
        return resultValidation;
    }
}

module.exports = Auth;