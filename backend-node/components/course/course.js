const ResultValidation = require('./entity/result-validation');
require('../../environment-validation');


class Course {
    constructor(courseRepository) {
        this.couseRepository = courseRepository;
    }

    async listAllCourses() {
        const resultValidation = new ResultValidation();
        try {
            const response = await this.couseRepository.getCourses();
            resultValidation.setResult(response);
        } catch (error) {
            console.log(`Falha ao listar todo cursos, error: ${error}`);
            resultValidation.addError('GET_ERROR', 'Falha ao listar todos cursos', true);
        }
        return resultValidation;
    }

    async getCourseById(courseId) {
        const resultValidation = new ResultValidation();
        try {
            if (!courseId) {
                resultValidation.addError('PARAMS_ERROR', `O id inserido é inválido!`);
                console.log(`O id ${courseId} não é um id válido de curso`);
            }
            const response = await this.couseRepository.getCourseById(courseId);
            if (!response) {
                resultValidation.addError('GET_ERROR', 'Não foi possível ecnontrar um curso com o id informado', false);
                console.log(`Não foi possível ecnontrar um curso com o id ${courseId}`)
            }
            resultValidation.setResult(response);
        } catch (error) {
            console.log(`Falha ao buscar curso pelo id: ${courseId}, error: ${error}`);
            resultValidation.addError('GET_ERROR', 'Falha ao buscar curso pelo id', true);
        }
        return resultValidation;
    }

    async createCourse(courseData) {
        const resultValidation = new ResultValidation();
        try {
            if(this.#verifyCourseParams(courseData)) {
                resultValidation.addError('PARAMS_ERROR', 'Os parâmetros nome é código são obrigatórios');
                return resultValidation;
            }

            const response = await this.couseRepository.addCourse(courseData);

            if (response) {
                console.log(`Curso adicionado com sucesso, com os seguintes dados`, courseData);
                resultValidation.setResult(response);
            } else {
                resultValidation.addError('CREATE_ERROR', 'Não foi possível adicionar o curso', false);
                console.log(`Não foi possível adicionar o curso com os seguintes dados: ${JSON.stringify(courseData)}`);
            }

        } catch (error) {
            console.log(`Falha ao criar curso com os seguintes dados: ${JSON.stringify(courseData)}, error: ${error}`);
            resultValidation.addError('CREATE_ERROR', 'Falha ao criar curso', true);
        }
        return resultValidation;
    }

    async updateCourse(courseData, courseId) {
        const resultValidation = new ResultValidation();
        try {
            if (this.#verifyCourseParams(courseData)) {
                resultValidation.addError('PARAMS_ERROR', 'Os parâmetros nome é código são obrigatórios');
                return resultValidation;
            }

            if (!courseId) {
                resultValidation.addError('PARAMS_ERROR', `O id inserido é inválido!`);
                console.log(`O id ${courseId} não é um id válido de curso`);
                return resultValidation;
            }

            const response = await this.couseRepository.updateCourseById(courseData, courseId);
            if (response) {
                console.log(`Curso atualizado com sucesso, com os seguintes dados`, courseData);
                resultValidation.setResult(response);
            } else {
                resultValidation.addError('UPDATE_ERROR', 'Não foi possível atualizar o curso', false);
                console.log(`Não foi possível atualizar o curso com os seguintes dados: ${JSON.stringify(courseData)}`);
            }
        } catch (error) {
            console.log(`Falha ao atualizar curso com os seguintes dados: ${JSON.stringify(courseData)}, error: ${error}`);
            resultValidation.addError('UPDATE_ERROR', 'Falha ao atualizar curso', true);
        }
        return resultValidation;
    }

    #verifyCourseParams(courseData) {
        let hasError = false;
        if (!courseData?.name) {
            hasError = true;
            console.log('O nome do curso é obrigatório');
        } else if (!courseData?.code) {
            hasError = true;
            console.log('O código do curso é obrigatório');
        }
        return hasError;
    }

    async deleteCourse(courseId) {
        const resultValidation = new ResultValidation();
        try {
            if (!courseId) {
                console.log(`Id ${courseId} do curso é obrigatório`);
                resultValidation.addError('PARAMS_FAILED', `O id ${courseId} não é válido para apagar um usuário`, false)
            }

            const response = await this.couseRepository.deleteCourseById(courseId);
            if (response) {
                console.log(`Curso de id ${courseId} apagado com sucesso`);
                resultValidation.setResult(response);
            } else {
                resultValidation.addError('DELETE_ERROR', 'Não foi possível apagar o curso', false);
                console.log(`Não foi possível apagar o curso com id ${courseId}`);
            }
        } catch (error) {
            console.log(`Falha ao apagar curso com id ${courseId}`);
        }
        return resultValidation;
    }
}

module.exports = Course;