import './navbar.css'

import { NavLink } from 'react-router-dom';

import person from '../../../assets/img/person.png';
import filter from '../../../assets/img/FilterRight.png';

const Navbar = () => {
    return (
       <header className='navbar'>
        <div>
            <NavLink to={'/'} style={{color:'#D9D9D9' ,textDecoration: 'none'}}>
                <h1>CODE+</h1>
            </NavLink>
            <NavLink to={'/certificados'} style={{color:'#D9D9D9' ,textDecoration: 'none'}}>
            <a>Certificados</a>
            </NavLink>
            <p>|</p>
            <NavLink to={'/painel'} style={{color:'#D9D9D9' ,textDecoration: 'none'}}>
            <a>Horas totais</a>
            </NavLink>
        </div>
        <div>
            <NavLink to={'/alunos'} style={{color:'#D9D9D9' ,textDecoration: 'none'}}>
            <a className='person'><img src={person}/></a>
            </NavLink>
            <p>|</p>
            <NavLink to={'/atividades'} style={{color:'#D9D9D9' ,textDecoration: 'none'}}>
            <a className='filter'><img src={filter}/></a>
            </NavLink>
        </div>
       </header>
    )
}

export default Navbar;

//<NavLink to={'/'}>
//<img src={logo} width={'35px'} alt={'Logo SHC'}/>
//</NavLink>