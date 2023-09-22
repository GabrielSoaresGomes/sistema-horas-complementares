import {BrowserRouter, Routes, Route} from 'react-router-dom';

const Router = ({navbar, footer}) => {
    return (
        <BrowserRouter>
            {navbar}
            <Routes>
                <Route path={'/'} element={<h1>OI</h1>}/>
            </Routes>
            {footer}
        </BrowserRouter>
    )
}

export default Router;