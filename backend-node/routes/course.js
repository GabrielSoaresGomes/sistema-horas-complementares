const express = require('express');

const CourseComponent = require('../components/course/course');
const CourseRepository = require('../components/course/data/course-repository')

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

router.get('/', async (req, res) => {
    const couseComponent = new CourseComponent(new CourseRepository());
    const result = await couseComponent.listAllCourses();
    applyResult(result, res, 200);
});

router.get('/:courseId', async (req, res) => {
    const courseComponent = new CourseComponent(new CourseRepository());
    const result = await courseComponent.getCourseById(req?.params?.courseId);
    applyResult(result, res, 200);
});

router.post('/', async (req, res) => {
    const courseComponent = new CourseComponent(new CourseRepository());
    const result = await courseComponent.createCourse(req?.body);
    applyResult(result, res, 201);
});

router.put('/:courseId', async (req, res) => {
    const courseComponent = new CourseComponent(new CourseRepository());
    const result = await courseComponent.updateCourse(req?.body, req?.params?.courseId);
    applyResult(result, res, 200);
});

router.delete('/:courseId', async (req, res) => {
    const courseComponent = new CourseComponent(new CourseRepository());
    const result = await courseComponent.deleteCourse(req?.params?.courseId);
    applyResult(result, res, 200);
});

module.exports = router;
