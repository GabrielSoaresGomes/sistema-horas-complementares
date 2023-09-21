const express = require('express');

const UserComponent = require('../components/user/user');
const UserRepository = require('../components/user/data/user-repository');
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

router.get('/', async (req, res) => {
    const userComponent = new UserComponent(new UserRepository());
    const result = await userComponent.listAllUsers();
    applyResult(result, res, responseStatusCode.OK);
});

router.post('/', async (req, res) => {
    const userComponent = new UserComponent(new UserRepository());
    const result = await userComponent.createUser(req?.body);
    applyResult(result, res, responseStatusCode.OK);
});

router.put('/:userId', async (req, res) => {
    const userComponent = new UserComponent(new UserRepository());
    const result = await userComponent.updateUser(req?.body, req?.params?.userId);
    applyResult(result, res, responseStatusCode.OK);
});

router.delete('/:userId', async (req, res) => {
    const userComponent = new UserComponent(new UserRepository());
    const result = await userComponent.deleteUser(req?.params?.userId);
    applyResult(result, res, responseStatusCode.ACCEPTED);
});

module.exports = router;