import './App.css';

import Routes from './pages/routes'
import Navbar from "./components/Navbar/Navbar";
function App() {
    return (
        <>
        <Routes />
        </>
    )
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
