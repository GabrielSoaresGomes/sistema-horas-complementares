const express = require('express');

const UserComponent = require('../components/users/users');
const UserRepository = require('../components/users/data/user-repository');

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

router.get('/user', async (req, res, next) => {
    const userComponent = new UserComponent(new UserRepository());
    const result = await userComponent.testComponent();
    applyResult(result, res, 200);
});

module.exports = router;