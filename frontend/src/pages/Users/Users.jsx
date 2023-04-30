import Skeleton from "../../components/Skeleton/Skeleton";
import {useCallback, useEffect, useState} from "react";
import {Table, Popconfirm} from "antd";

import DetailUserModal from "./modal/DetailUserModal";
import ApiInstance from '../../services/apis';

const Users = () => {

    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userList, setUserList] = useState([]);

    const handleDelete = async (user) => {
        try {
            await ApiInstance.delete(`users/${user?.id}`);
            if (user) {
                const index = userList.indexOf(user);
                if (index > -1) {
                    setUserList(userList.splice(index, 1));
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = async (user) => {
        try {
            setSelectedUser(user);
            setOpenModal(true);
        } catch (error) {
            console.log(error);
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
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
                <div className={'d-flex flex-around justify-content-around'}>
                    <div onClick={async () => {
                        await handleEdit(user);
                    }}
                    >
                        <i className="bi bi-pencil-square fs-5 cursor-pointer"></i>
                    </div>

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
            const result = await ApiInstance.get('users/');
            console.log(result)
            setUserList(result);
        } catch (error) {
            console.log(error);
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
                    onRow={(record) => ({
                        onDoubleClick: () => {
                            handleEdit(record).then(r => {return null});
                        },
                    })}
                />
                <DetailUserModal
                    isModalVisible={openModal}
                    handleCancel={() => {
                        setOpenModal(false);
                    }}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                />
            </div>
        </Skeleton>
    );
}

export default Users;