import {Link, useLocation} from "react-router-dom";
import {useState, useEffect} from "react";

const Navbar = () => {

    const [activeRoute, setActiveRoute] = useState('');
    const location = useLocation();

    useEffect(() => {
        setActiveRoute(location.pathname);
    }, []);


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${activeRoute === '/' ? 'active': ''}`}
                                  to={'/'}>Home</Link>
                        </li>
                        <li className="nav-item"> {/* Mostrar só se for Adm */}
                            <Link className={`nav-link ${activeRoute === '/users' ? 'active': ''}`}
                                  to={'/users'}>Usuários</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${activeRoute === '/activities' ? 'active': ''}`}
                                  to={'/activities'}>Atividades</Link>
                        </li>
                        <li className="nav-item"> {/* Mostrar só se for Adm? */}
                            <Link className={`nav-link ${activeRoute === '/courses' ? 'active': ''}`}
                                  to={'/courses'}>Cursos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${activeRoute === '/user-painel' ? 'active': ''}`}
                                  to={'/user-painel'}>Meu Painel</Link>
                        </li>
                    </ul>
                    <span className='ms-auto'><i className="bi bi-person-circle fs-2"></i></span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;