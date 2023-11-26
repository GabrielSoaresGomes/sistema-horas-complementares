import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Certificados from './pages/Certificados/Certificados';
import Login from "./pages/Login/Login";

const Router = ({navbar, footer}) => {
    return (
            <BrowserRouter>
                {navbar}
                    <Routes>
                        <Route path={'/'} element={<Home />}/>
                        <Route path={'/certificados'} element={<Certificados />}/>
                        <Route path={'/painel'} element={<h1>Horas Totais</h1>}/>
                        <Route path={'/alunos'} element={<h1>Alunos</h1>}/>
                        <Route path={'/atividades'} element={<h1>Atividades</h1>}/>
                        <Route path={'/login'} element={<Login />}/>
                    </Routes>
                {footer}
            </BrowserRouter>
    )
}

export default Router;