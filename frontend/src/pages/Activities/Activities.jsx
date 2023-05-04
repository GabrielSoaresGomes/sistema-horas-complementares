import Skeleton from "../../components/Skeleton/Skeleton";
import {useCallback, useEffect, useState} from "react";
import {Table, Popconfirm, message} from "antd";

// import DetailActivityModal from "./modal/DetailActivityModal";
import ApiInstance from '../../services/apis';

const Activities = () => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [activitiesList, setActivitiesList] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDelete = useCallback(async (activity) => {
        try {
            await ApiInstance.delete(`api/activity/${activity?.id}`);
            if (activity) {
                const objWithIdIndex = activitiesList.findIndex((obj) => obj.id === activity.id);
                console.log(objWithIdIndex)
                if (objWithIdIndex > -1) {
                    setActivitiesList(activitiesList.filter((obj) => obj.id !== activity.id));
                }
            }

        } catch (error) {
            console.log(error)
        }
    }, [activitiesList]);

    const handleEdit = useCallback(async (activity) => {
        try {
            selectedActivity(activity);
            setOpenModal(true);
        } catch (error) {
            console.log(error);
        }
    }, [selectedActivity]);

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

    return (
        <Skeleton>
            <h1>Activities</h1>
        </Skeleton>
    );
}

export default Activities;