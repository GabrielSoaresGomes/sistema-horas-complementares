const express = require('express');

const UserComponent = require('../components/user/user');
const UserRepository = require('../components/user/data/user-repository');
const responseStatusCode = require('../entity/response-status-code');
const applyResult = require('../entity/apply-result');
const authentication = require('./middlewares/authentication');

const router = express.Router();

router.get('/', authentication, async (req, res) => {
    const userComponent = new UserComponent(new UserRepository());
    const result = await userComponent.listAllUsers();
    applyResult(result, res, responseStatusCode.OK);
});

router.post('/', authentication, async (req, res) => {
    const userComponent = new UserComponent(new UserRepository());
    const result = await userComponent.createUser(req?.body);
    applyResult(result, res, responseStatusCode.OK);
});

router.put('/:userId', authentication, async (req, res) => {
    const userComponent = new UserComponent(new UserRepository());
    const result = await userComponent.updateUser(req?.body, req?.params?.userId);
    applyResult(result, res, responseStatusCode.OK);
});

router.delete('/:userId', authentication, async (req, res) => {
    const userComponent = new UserComponent(new UserRepository());
    const result = await userComponent.deleteUser(req?.params?.userId);
    applyResult(result, res, responseStatusCode.ACCEPTED);
});

module.exports = router;