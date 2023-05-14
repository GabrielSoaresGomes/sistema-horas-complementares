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
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true
        },
        {
            title: '',
            dataIndex: '',
            key: '',
            width: '10%',
            ellipsis: true,
            render: useCallback((activity) => (
                <div className={'d-flex flex-around justify-content-around'}>
                    <div onClick={async () => {
                        await handleEdit(activity);
                    }}
                    >
                        <i className="bi bi-pencil-square fs-5 cursor-pointer"></i>
                    </div>

                    <Popconfirm
                        title={'Certeza que deseja excluir essa atividade?'}
                        placement={'topLeft'}
                        onConfirm={async () => {await handleDelete(activity); }}
                        onCancel={() => {}}
                        okText={'Sim'}
                        cancelText={'Não'}
                        data-tst={'delete_activity_button'}
                    >
                        <i className="bi bi-trash-fill fs-5 cursor-pointer"></i>
                    </Popconfirm>
                </div>
            ), [handleDelete, handleEdit])
        }
    ];

    const getActivities = async () => {
        try {
            setLoading(true);
            const result = await ApiInstance.get('api/activity/');
            console.log(result)
            result ? setActivitiesList(result) : setActivitiesList([]);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setActivitiesList([]);
            console.log('Falha ao listar atividades');
            message.error('Ocorreu um erro! 😢');
        }
    }

    useEffect(() => {
        getActivities().then();
    }, []);

    return (
        <Skeleton>
            <h1>Atividades</h1>

            <Table
                columns={columns}
                dataSource={[...activitiesList]}
                data-tst='table_activities'
                rowKey={'id'}
                loading={loading}
                showSorterTooltip={false}
                onRow={(record) => ({
                    onDoubleClick: () => {
                        handleEdit(record).then();
                    },
                })}
            />
        </Skeleton>
    );
}

export default Activities;