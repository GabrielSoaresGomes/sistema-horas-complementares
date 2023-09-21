const express = require('express');

const AuthComponent = require('../components/auth/auth');
const UserRepository = require('../components/auth/data/user-repository');
const responseStatusCode = require('../entity/response-status-code');

const router = express.Router();


const applyResult = (result, res, successStatusCode) => {
    if (result.hasError()) {
        if (result.hasCriticalError()) {
            res.status(responseStatusCode.INTERNAL_SERVER_ERROR);
        } else {
            res.status(responseStatusCode.BAD_REQUEST);
        }
        res.send(result.getErrorList());
    } else if (result.isResultEmpty()) {
        res.status(responseStatusCode.BAD_REQUEST);
        res.send([]);
    } else {
        res.status(successStatusCode);
        res.send(result.getResult());
    }
};

router.post('/login', async (req, res) => {
    const authComponent = new AuthComponent(new UserRepository());
    const result = await authComponent.login(req?.body);
    applyResult(result, res, responseStatusCode.OK);
});

router.post('/logout', async (req, res) => {
    const authComponent = new AuthComponent(new UserRepository());
    const result = await authComponent.logout(req?.body?.id);
    applyResult(result, res, responseStatusCode.OK);
});

module.exports = router;