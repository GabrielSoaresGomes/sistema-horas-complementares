import './App.css';

function App() {

    const userList = [
        {
            name: 'Admin',
            registration: '000000000',
            is_admin: true
        }
    ];

    return (
    <div className="App">

      <h1 style={{color: 'White'}}>Home</h1>

        <UserList userList={userList} />

    </div>
    );
}

const User = (props) => {

    const userIsAdmin = props.isAdmin;

    return (
        <div>
            <h1 className={'user-name'}>Nome:{props.name}</h1>
            <h1>Matricula: {props.registration}</h1>
            {userIsAdmin ? (<h1>Usuário é admin</h1>) : (<h1>Usuário não é admin</h1>)}
            <hr />
        </div>
    )
}

const UserList = props => {
    return (
        <div>
        {props.userList.map(user => (
            <User name={user.name} registration={user.registration} isAdmin={user.is_admin} />
            ))}
        </div>
    )
}
export default App;
