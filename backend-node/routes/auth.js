const express = require('express');

const AuthComponent = require('../components/auth/auth');
const UserRepository = require('../components/auth/data/user-repository');
const responseStatusCode = require('../entity/response-status-code');
const applyResult = require('../entity/apply-result');

const router = express.Router();

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