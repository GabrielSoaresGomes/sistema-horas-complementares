import './App.css';

function App() {

    const userList = [
        {
            name: 'Admin',
            registration: '000000000'
        }
    ];

    return (
    <div className="App">

      <h1>Home</h1>

        <UserList userList={userList} />

    </div>
    );
}

const User = (props) => {

    return (
        <div>
            <h1>Nome:{props.name}</h1>
            <h1>Matricula: {props.registration}</h1>
            <hr />
        </div>
    )
}

const UserList = props => {
    return (
        <div>
        {props.userList.map(user => (
            <User name={user.name} registration={user.registration} />
            ))}
        </div>
    )
}
export default App;
