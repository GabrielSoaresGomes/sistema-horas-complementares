import React from "react";
import { BrowserRouter, Routes as RoutesReact, Route } from 'react-router-dom';

import Home from './Home/Home';
import Users from './Users/Users';
import Activities from './Activities/Activities';
import Courses from './Courses/Courses';
import UserPainel from './UserPainel/UserPainel';

const Routes = () => {
    return (
        <BrowserRouter>
            <RoutesReact>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="users" element={<Users />} />
                    <Route exact path="activities" element={<Activities />} />
                    <Route exact path="courses" element={<Courses />} />
                    <Route exact path="user-painel" element={<UserPainel />} />
            </RoutesReact>
        </BrowserRouter>
    );
}

export default Routes;
