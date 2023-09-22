const express = require('express');

const CourseComponent = require('../components/course/course');
const CourseRepository = require('../components/course/data/course-repository');
const responseStatusCode = require('../entity/response-status-code');
const applyResult = require('../entity/apply-result');
const authentication = require('./middlewares/authentication');

const router = express.Router();

router.get('/', authentication, async (req, res) => {
    const couseComponent = new CourseComponent(new CourseRepository());
    const result = await couseComponent.listAllCourses();
    applyResult(result, res, responseStatusCode.OK);
});

router.get('/:courseId', authentication, async (req, res) => {
    const courseComponent = new CourseComponent(new CourseRepository());
    const result = await courseComponent.getCourseById(req?.params?.courseId);
    applyResult(result, res, responseStatusCode.OK);
});

router.post('/', authentication, async (req, res) => {
    const courseComponent = new CourseComponent(new CourseRepository());
    const result = await courseComponent.createCourse(req?.body);
    applyResult(result, res, responseStatusCode.CREATED);
});

router.put('/:courseId', authentication, async (req, res) => {
    const courseComponent = new CourseComponent(new CourseRepository());
    const result = await courseComponent.updateCourse(req?.body, req?.params?.courseId);
    applyResult(result, res, responseStatusCode.OK);
});

router.delete('/:courseId', authentication, async (req, res) => {
    const courseComponent = new CourseComponent(new CourseRepository());
    const result = await courseComponent.deleteCourse(req?.params?.courseId);
    applyResult(result, res, responseStatusCode.OK);
});

module.exports = router;
