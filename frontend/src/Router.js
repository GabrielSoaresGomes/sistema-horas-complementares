import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home/Home";

const Router = ({navbar, footer}) => {
    return (
            <BrowserRouter>
                {navbar}
                    <Routes>
                        <Route path={'/'} element={<Home />}/>
                        <Route path={'/certificados'} element={<h1>Certificados</h1>}/>
                        <Route path={'/painel'} element={<h1>Horas Totais</h1>}/>
                        <Route path={'/alunos'} element={<h1>Alunos</h1>}/>
                        <Route path={'/atividades'} element={<h1>Atividades</h1>}/>
                    </Routes>
                {footer}
            </BrowserRouter>
    )
}

export default Router;