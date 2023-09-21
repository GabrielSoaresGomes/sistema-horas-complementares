const AuthComponent = require('../../components/auth/auth');
const AuthRepository = require('../../components/auth/data/user-repository');
const responseStatusCode = require('../../entity/response-status-code');

const Authentication = async (req, res, next) => {
    const secondElement = 1;
    const token = req?.headers?.authorization?.split(' ')[secondElement];

    if (!token) {
        return res.status(responseStatusCode.UNAUTHORIZED).json({ message:  'Token não foi informado' });
    }

    const authComponent = new AuthComponent(new AuthRepository());
    const authenticationResult = await authComponent.authenticate(token);
    if(authenticationResult.hasError()) {
        return res.sendStatus(responseStatusCode.FORBIDDEN);
    }

    req.user = authenticationResult.getResult();
    return next();
};

module.exports = Authentication;