const express = require('express');

const UserComponent = require('../components/user/user');
const UserRepository = require('../components/user/data/user-repository');

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
}

router.get('/users', async (req, res) => {
    const userComponent = new UserComponent(new UserRepository());
    const result = await userComponent.listAllUsers();
    applyResult(result, res, 200);
});

router.post('/users', async (req, res) => {
    const userComponent = new UserComponent(new UserRepository());
    const result = await userComponent.createUser(req?.body);
    applyResult(result, res, 200);
});

router.put('/users/:userId', async (req, res) => {
    const userComponent = new UserComponent(new UserRepository());
    const result = await userComponent.updateUser(req?.body, req?.params?.userId);
    applyResult(result, res, 200);
});

module.exports = router;