import Skeleton from "../../components/Skeleton/Skeleton";
import {useCallback, useEffect, useState} from "react";
import {Table, Popconfirm, message} from "antd";

import DetailCourseModal from "./modal/DetailCourseModal";
import ApiInstance from '../../services/apis';
const Courses = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDelete = useCallback(async (course) => {
        try {
            await ApiInstance.delete(`api/course/${course?.id}`);
            if (course) {
                const objWithIdIndex = courseList.findIndex((obj) => obj.id === course.id);
                console.log(objWithIdIndex)
                if (objWithIdIndex > -1) {
                    setCourseList(courseList.filter((obj) => obj.id !== course.id) || []);
                }
            }

        } catch (error) {
            console.log(error)
        }
    }, [courseList]);

    const handleEdit = useCallback(async (course) => {
        try {
            setSelectedCourse(course);
            setOpenModal(true);
        } catch (error) {
            console.log(error);
        }
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
            ellipsis: true
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            ellipsis: true
        },
        {
            title: '',
            dataIndex: '',
            key: '',
            width: '10%',
            ellipsis: true,
            render: useCallback((course) => (
                <div className={'d-flex flex-around justify-content-around'}>
                    <div onClick={async () => {
                        await handleEdit(course);
                    }}
                    >
                        <i className="bi bi-pencil-square fs-5 cursor-pointer"></i>
                    </div>

                    <Popconfirm
                        title={'Certeza que deseja excluir esse curso?'}
                        placement={'topLeft'}
                        onConfirm={async () => {await handleDelete(course); }}
                        onCancel={() => {}}
                        okText={'Sim'}
                        cancelText={'Não'}
                        data-tst={'delete_course_button'}
                    >
                        <i className="bi bi-trash-fill fs-5 cursor-pointer"></i>
                    </Popconfirm>
                </div>
            ), [handleDelete, handleEdit])
        }
    ];

    const getCourses = async () => {
        try {
            setLoading(true);
            const result = await ApiInstance.get('api/course/');
            setCourseList(result || []);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log('Falha ao listar cursos');
            message.error('Ocorreu um erro! 😢');
        }
    }

    useEffect(() => {
        getCourses().then();
    }, []);

    return (
        <Skeleton>
            <h1>Cursos</h1>
            <div>
                <Table
                    columns={columns}
                    dataSource={[...courseList]}
                    data-tst='table_courses'
                    rowKey={'id'}
                    loading={loading}
                    showSorterTooltip={false}
                    onRow={(record) => ({
                        onDoubleClick: () => {
                            handleEdit(record).then();
                        },
                    })}
                />
                <DetailCourseModal
                    isModalVisible={openModal}
                    handleCancel={() => {
                        setOpenModal(false);
                    }}
                    selectedCourse={selectedCourse}
                    setSelectedCourse={setSelectedCourse}
                />
            </div>
        </Skeleton>
    );
}

export default Courses;