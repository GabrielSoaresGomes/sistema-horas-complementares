const express = require('express');

const ActivityComponent = require('../components/activity/activity');
const ActivityRepository = require('../components/activity/data/activity-repository');
const responseStatusCode = require('../entity/response-status-code');
const applyResult = require('../entity/apply-result');
const authentication = require('./middlewares/authentication');

const router = express.Router();

router.post('/', authentication, async(req, res) => {
    const activityComponent = new ActivityComponent(new ActivityRepository());
    const result = await activityComponent.createActivity(req?.body);
    applyResult(result, res, responseStatusCode.CREATED);
});

router.get('/', authentication, async(req, res) => {
    const activityComponent = new ActivityComponent(new ActivityRepository());
    const result = await activityComponent.listAllActivities();
    applyResult(result, res, responseStatusCode.OK);
});

router.get('/:activityId', authentication, async(req, res) => {
    const activityComponent = new ActivityComponent(new ActivityRepository());
    const result = await activityComponent.getActivity(req.params.activityId);
    applyResult(result, res, responseStatusCode.OK);
});

router.put('/:activityId', authentication, async (req, res) => {
    const activityComponent = new ActivityComponent(new ActivityRepository());
    const result = await activityComponent.updateActivity(req.params.activityId, req.body);
    applyResult(result, res, responseStatusCode.OK);
});

router.delete('/:activityId', authentication, async (req, res) => {
    const activityComponent = new ActivityComponent(new ActivityRepository());
    const result = await activityComponent.deleteActivity(req.params.activityId);
    applyResult(result, res, responseStatusCode.ACCEPTED);
});

module.exports = router;