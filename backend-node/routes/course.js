const express = require('express');

const CourseComponent = require('../components/course/course');
const CourseRepository = require('../components/course/data/course-repository');
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
    const couseComponent = new CourseComponent(new CourseRepository());
    const result = await couseComponent.listAllCourses();
    applyResult(result, res, responseStatusCode.OK);
});

router.get('/:courseId', async (req, res) => {
    const courseComponent = new CourseComponent(new CourseRepository());
    const result = await courseComponent.getCourseById(req?.params?.courseId);
    applyResult(result, res, responseStatusCode.OK);
});

router.post('/', async (req, res) => {
    const courseComponent = new CourseComponent(new CourseRepository());
    const result = await courseComponent.createCourse(req?.body);
    applyResult(result, res, responseStatusCode.CREATED);
});

router.put('/:courseId', async (req, res) => {
    const courseComponent = new CourseComponent(new CourseRepository());
    const result = await courseComponent.updateCourse(req?.body, req?.params?.courseId);
    applyResult(result, res, responseStatusCode.OK);
});

router.delete('/:courseId', async (req, res) => {
    const courseComponent = new CourseComponent(new CourseRepository());
    const result = await courseComponent.deleteCourse(req?.params?.courseId);
    applyResult(result, res, responseStatusCode.OK);
});

module.exports = router;
