import Skeleton from "../../components/Skeleton/Skeleton";
import {useEffect, useState} from "react";

const Users = () => {

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        setUserList([
            {
                id: 0,
                name: 'admin',
                registration: '000000000'
            },
            {
                id: 1,
                name: 'Gabriel Soares',
                registration: '202110116'
            },
            {
                id: 2,
                name: 'Junior Nascimento',
                registration: '123456789'
            },
            {
                id: 3,
                name: 'Luis Felipe',
                registration: '987654321'
            },
            {
                id: 4,
                name: 'Luiz Henrique',
                registration: '112233445'
            },
        ]);
    }, []);

    return (
        <Skeleton>
            <h1>Users</h1>
            <div>
                {userList.map((user, index) => (
                    <div key={user.id}>
                        <p>Id: {user.id}</p>
                        <p>Nome: {user.name}</p>
                        <p>Matrpicula: {user.registration}</p>
                    </div>
                ))}
            </div>
        </Skeleton>
    );
}

export default Users;