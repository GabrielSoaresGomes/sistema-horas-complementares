import Skeleton from "../../components/Skeleton/Skeleton";
import {useCallback, useEffect, useState} from "react";
import {Table, Popconfirm} from "antd";

import ApiInstanceUser from '../../services/apiUser';

const Users = () => {

    const [userList, setUserList] = useState([]);

    const handleDelete = async (user) => {
        try {
            await ApiInstanceUser.delete(`/users/${user?.id}`);
            if (user) {
                const index = userList.indexOf(user);
                if (index > -1) {
                    setUserList(userList.splice(index, 1));
                }
            }

        } catch (error) {

        }
    }

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
            title: 'Matrícula',
            dataIndex: 'registration',
            key: 'registration',
            ellipsis: true,
            width: '20%'
        },
        {
            title: 'Curso',
            dataIndex: 'course_name',
            key: 'course_name',
            ellipsis: true
        },
        {
            title: '',
            dataIndex: '',
            key: '',
            width: '10%',
            ellipsis: true,
            render: useCallback((user) => (
                <div className={'d-flex'}>
                    <><i className="bi bi-pencil-square fs-5 cursor-pointer"></i></>

                    <Popconfirm
                        title={'Certeza que deseja excluir esse usuário?'}
                        placement={'topLeft'}
                        onConfirm={async () => {await handleDelete(user); }}
                        onCancel={() => {}}
                        okText={'Sim'}
                        cancelText={'Não'}
                        data-tst={'delete_user_button'}
                    >
                        <i className="bi bi-trash-fill fs-5 cursor-pointer"></i>
                    </Popconfirm>
                </div>
            ))
        }
    ]

    const getUsers = async () => {
        try {
            const result = await ApiInstanceUser.get('/users/');
            setUserList(result);
        } catch (error) {

        }
    }

    useEffect(() => {
        getUsers();
    }, []);



    return (
        <Skeleton>
            <h1>Users</h1>
            <div>
                <Table
                    columns={columns}
                    dataSource={userList}
                    data-tst='table_users'
                    rowKey={'id'}
                    showSorterTooltip={false}
                />
            </div>
        </Skeleton>
    );
}

export default Users;