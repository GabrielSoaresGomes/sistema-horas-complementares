import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Certificados from './pages/Certificados/Certificados';
import Login from "./pages/Login/Login";
import NavbarLogin from "./components/layout/NavbarLogin/NavbarLogin";
import Navbar from "./components/layout/Navbar/Navbar";

const AppNavbar = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    return isLoginPage ? <NavbarLogin/> : <Navbar/>;
};

const Router = ({footer}) => {

    return (
            <BrowserRouter>
                <AppNavbar/>
                    <Routes>
                        <Route path={'/'} element={<Home />}/>
                        <Route path={'/certificados'} element={<Certificados />}/>
                        <Route path={'/painel'} element={<h1>Horas Totais</h1>}/>
                        <Route path={'/alunos'} element={<h1>Alunos</h1>}/>
                        <Route path={'/atividades'} element={<h1>Atividades</h1>}/>
                        <Route path={'/login'} element={<Login />} />
                    </Routes>
                {footer}
            </BrowserRouter>
    )
}

export default Router;