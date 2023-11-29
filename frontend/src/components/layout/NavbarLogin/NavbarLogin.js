import './navbarLogin.css'

import { NavLink } from 'react-router-dom';


const NavbarLogin = () => {
    return (
       <header className='header'>
        <div className='codediv'>
            <NavLink to={'/login'} style={{color:'#D9D9D9' ,textDecoration: 'none'}}>
                <h1>CODE+</h1>
            </NavLink>
        </div>
       </header>
    )
}
export default NavbarLogin;