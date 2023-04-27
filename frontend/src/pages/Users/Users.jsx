import Skeleton from "../../components/Skeleton/Skeleton";
import {useEffect, useState} from "react";
import {Table} from "antd";

import ApiInstanceUser from '../../services/apiUser';

const Users = () => {

    const [userList, setUserList] = useState([]);

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
            width: '15%',
            ellipsis: true,
            render: () => (
                <>DELETAR | EXCLUIR</>
            )
        }
    ]

    const getUsers = async () => {
        try {
            const result = await ApiInstanceUser.get('/users/');
            console.log(result);
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