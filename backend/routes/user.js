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

router.post('/activity/:activityId', authentication, async (req, res) => {
    const userComponent = new UserComponent(new UserRepository());
    const result = await userComponent.createActivityUser(req?.body, req?.user);
    applyResult(result, res, responseStatusCode.CREATED);
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

router.get('/activity', authentication, async (req, res) => {
    const userComponent = new UserComponent(new UserRepository());
    const result = await userComponent.getAllUserActivites(req?.user);
    applyResult(result, res, responseStatusCode.OK);
});

router.get('/:userId/activity', authentication, async (req, res) => {
    const userComponent = new UserComponent(new UserRepository());
    const result = await userComponent.getUserActivitiesByUserId(req?.params?.userId, req?.user);
    applyResult(result, res, responseStatusCode.OK);
});

//  user/1/activity/ - aluno / coordenador -> ver de um aluno especifico
//  user/activity - coordenador -> ver de todos os alunos
module.exports = router;