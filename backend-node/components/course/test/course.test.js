const Course = require('../course');

afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
});

const courseRepositoryMock = {
    getCourses: jest.fn(),
    getCourseById: jest.fn(),
    addCourse: jest.fn(),
    updateCourseById: jest.fn(),
    deleteCourseById: jest.fn()
};

describe('Testes para a classe Course', () => {
    describe('Testes para o método listAllCourses', () => {
        it('Listagem de todos os cursos efetuado com sucesso, fluxo normal', async () => {
            const course = new Course(courseRepositoryMock);

            courseRepositoryMock.getCourses.mockReturnValue([{
                'name': 'Engenharia de Software',
                'code': 'code_100'
            }, {
                'name': 'Engenharia Elétrica',
                'code': 'code_101'
            }
            ]);

            const result = await course.listAllCourses();

            expect(result.getResult()).toStrictEqual([{
                'name': 'Engenharia de Software',
                'code': 'code_100'
            }, {
                'name': 'Engenharia Elétrica',
                'code': 'code_101'
            }]);
        });

        it('Erro na listagem de todos os cursos, fluxo de exceção', async () => {
            const course = new Course(courseRepositoryMock);

            courseRepositoryMock.getCourses.mockImplementation(() => {
                throw new Error('erro');
            });

            const result = await course.listAllCourses();

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'GET_ERROR',
                message: 'Falha ao listar todos cursos'
            }]);
        });
    });

    describe('Testes para o método getCourseById', () => {
        it('Busca usuário pelo id com sucesso, fluxo normal', async () => {
            const course = new Course(courseRepositoryMock);
            const courseId = 2;

            courseRepositoryMock.getCourseById.mockReturnValue({
                name: 'Engenharia de Software',
                code: 'code_100'
            });

            const result = await course.getCourseById(courseId);

            expect(result.getResult()).toStrictEqual({
                name: 'Engenharia de Software',
                code: 'code_100'
            });
        });

        it('Tenta buscar usuário mas não é passado o id, fluxo alternativo', async () => {
            const course = new Course(courseRepositoryMock);

            courseRepositoryMock.getCourseById.mockReturnValue({
                name: 'Engenharia de Software',
                code: 'code_100'
            });

            const result = await course.getCourseById();

            expect(result.getErrorList()).toStrictEqual([{
                message: 'O id inserido é inválido!',
                tag: 'PARAMS_ERROR'
            }]);
        });

        it('Tenta buscar usuário pelo id sem sucesso, fluxo alternativo', async () => {
            const course = new Course(courseRepositoryMock);
            const courseId = 2;

            courseRepositoryMock.getCourseById.mockReturnValue();

            const result = await course.getCourseById(courseId);

            expect(result.getErrorList()).toStrictEqual([{
                message: 'Não foi possível ecnontrar um curso com o id informado',
                tag: 'GET_ERROR'
            }]);
        });

        it('Erro na busca de um usuário pelo id, fluxo de exceção', async () => {
            const course = new Course(courseRepositoryMock);
            const courseId = 2;

            courseRepositoryMock.getCourseById.mockImplementation(() => {
                throw new Error('erro');
            });

            const result = await course.getCourseById(courseId);

            expect(result.getErrorList()).toStrictEqual([{
                message: 'Falha ao buscar curso pelo id',
                tag: 'GET_ERROR'
            }]);
        });
    });

    describe('Testes para o método createCourse', () => {
        it('Cria um novo curso com sucesso, fluxo normal', async () => {
            const course = new Course(courseRepositoryMock);
            const courseData = {
                name: 'Engenharia de Software',
                code: 'code_100'
            };

            courseRepositoryMock.addCourse.mockReturnValue({
                name: 'Engenharia de Software',
                code: 'code_100'
            });

            const result = await course.createCourse(courseData);

            expect(result.getResult()).toStrictEqual({
                name: 'Engenharia de Software',
                code: 'code_100'
            });
        });

        it('Tenta criar um novo curso sem o nome, fluxo alternativo', async () => {
            const course = new Course(courseRepositoryMock);
            const courseData = {
                name: null,
                code: 'code_100'
            };

            courseRepositoryMock.addCourse.mockReturnValue({
                name: 'Engenharia de Software',
                code: 'code_100'
            });

            const result = await course.createCourse(courseData);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'PARAMS_ERROR',
                message: 'Os parâmetros nome e código são obrigatórios'
            }]);
        });

        it('Tenta criar um novo curso sem sucesso, fluxo alternativo', async () => {
            const course = new Course(courseRepositoryMock);
            const courseData = {
                name: 'Engenharia de Software',
                code: 'code_100'
            };

            courseRepositoryMock.addCourse.mockReturnValue();

            const result = await course.createCourse(courseData);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'CREATE_ERROR',
                message: 'Não foi possível adicionar o curso'
            }]);
        });

        it('Erro na criação de um novo curso, fluxo de exceção', async () => {
            const course = new Course(courseRepositoryMock);
            const courseData = {
                name: 'Engenharia de Software',
                code: 'code_100'
            };

            courseRepositoryMock.addCourse.mockImplementation(() => {
                throw new Error('erro');
            });

            const result = await course.createCourse(courseData);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'CREATE_ERROR',
                message: 'Falha ao criar curso'
            }]);
        });


    });

    describe('Testes para o método updateCourse', () => {
        it('Atualiza um curso com sucesso, fluxo normal', async () => {
            const course = new Course(courseRepositoryMock);
            const courseData = {
                name: 'Engenharia Elétrica ',
                code: 'code_101'
            };
            const courseId = 2;

            courseRepositoryMock.updateCourseById.mockReturnValue({
                name: 'Engenharia Elétrica',
                code: 'code_101'
            });

            const result = await course.updateCourse(courseData, courseId);

            expect(result.getResult()).toStrictEqual({
                name: 'Engenharia Elétrica',
                code: 'code_101'
            });
        });

        it('Tenta atualizar um curso sem codigo, fluxo alternativo', async () => {
            const course = new Course(courseRepositoryMock);
            const courseData = {
                name: 'Engenharia Elétrica ',
                code: null
            };
            const courseId = 2;

            courseRepositoryMock.updateCourseById.mockReturnValue({
                name: 'Engenharia Elétrica',
                code: 'code_101'
            });

            const result = await course.updateCourse(courseData, courseId);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'PARAMS_ERROR',
                message: 'Os parâmetros nome é código são obrigatórios'
            }]);
        });

        it('Tenta atualizar um curso sem passar o id, fluxo alternativo', async () => {
            const course = new Course(courseRepositoryMock);
            const courseData = {
                name: 'Engenharia Elétrica ',
                code: 'code_101'
            };

            courseRepositoryMock.updateCourseById.mockReturnValue({
                name: 'Engenharia Elétrica',
                code: 'code_101'
            });

            const result = await course.updateCourse(courseData);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'PARAMS_ERROR',
                message: 'O id inserido é inválido!'
            }]);
        });

        it('Tenta atualizar um curso sem sucesso, fluxo alternativo', async () => {
            const course = new Course(courseRepositoryMock);
            const courseData = {
                name: 'Engenharia Elétrica ',
                code: 'code_101'
            };
            const courseId = 2;

            courseRepositoryMock.updateCourseById.mockReturnValue();

            const result = await course.updateCourse(courseData, courseId);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'UPDATE_ERROR',
                message: 'Não foi possível atualizar o curso'
            }]);
        });

        it('Erro na atualização de um curso, fluxo de exceção', async () => {
            const course = new Course(courseRepositoryMock);
            const courseData = {
                name: 'Engenharia Elétrica ',
                code: 'code_101'
            };
            const courseId = 2;

            courseRepositoryMock.updateCourseById.mockImplementation(() => {
                throw new Error('erro');
            });

            const result = await course.updateCourse(courseData, courseId);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'UPDATE_ERROR',
                message: 'Falha ao atualizar curso'
            }]);
        });

    });

    describe('Testes para o método deleteCourse', () => {
        it('Deleta curso com sucesso, fluxo normal', async () => {
            const course = new Course(courseRepositoryMock);
            const courseId = 2;

            courseRepositoryMock.deleteCourseById.mockReturnValue({});

            const result = await course.deleteCourse(courseId);

            expect(result.getResult()).toStrictEqual({});
        });

        it('Tenta deletar curso sem passar o id, fluxo alternativo', async () => {
            const course = new Course(courseRepositoryMock);

            courseRepositoryMock.deleteCourseById.mockReturnValue({});

            const result = await course.deleteCourse();

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'PARAMS_FAILED',
                message: 'O id undefined não é válido para apagar um usuário'
            }]);
        });

        it('Tenta deletar curso sem sucesso, fluxo alternativo', async () => {
            const course = new Course(courseRepositoryMock);
            const courseId = 2;

            courseRepositoryMock.deleteCourseById.mockReturnValue();

            const result = await course.deleteCourse(courseId);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'DELETE_ERROR',
                message: 'Não foi possível apagar o curso'
            }]);
        });

        it('Erro ao deletar curso, fluxo de execeção', async () => {
            const course = new Course(courseRepositoryMock);
            const courseId = 2;

            courseRepositoryMock.deleteCourseById.mockImplementation(() => {
                throw new Error('erro');
            });

            const result = await course.deleteCourse(courseId);

            expect(result.getErrorList()).toStrictEqual([{
                tag: 'DELETE_ERROR',
                message: 'Falha ao deletar curso'
            }]);
        });
    });
});