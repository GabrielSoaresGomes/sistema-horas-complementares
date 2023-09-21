const express = require('express');

const AuthComponent = require('../components/auth/auth');
const UserRepository = require('../components/auth/data/user-repository');

const router = express.Router();


const applyResult = (result, res, successStatusCode) => {
    if (result.hasError()) {
        if (result.hasCriticalError()) {
            res.status(500);
        } else {
            res.status(400);
        }
        res.send(result.getErrorList());
    } else if (result.isResultEmpty()) {
        res.status(204);
        res.send([]);
    } else {
        res.status(successStatusCode);
        res.send(result.getResult());
    }
};

router.post('/login', async (req, res) => {
    const authComponent = new AuthComponent(new UserRepository());
    const result = await authComponent.login(req?.body);
    applyResult(result, res, 200);
});

router.post('/logout', async (req, res) => {
    const authComponent = new AuthComponent(new UserRepository());
    const result = await authComponent.logout(req?.body?.id);
    applyResult(result, res, 200);
});

module.exports = router;