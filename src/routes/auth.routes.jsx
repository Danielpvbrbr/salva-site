import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "../contexts/auth";
import ReactLoading from 'react-loading';

import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/SignUp/index';
// import Map from '../pages/MapView/index';
// import Map from '../pages/MapViewOld/index.tsx';

const largura = window.innerWidth;

const AuthRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <SignIn Link={Link}
                        AuthContext={AuthContext}
                        ReactLoading={ReactLoading}
                        largura={largura}
                    />
                }

            />

            <Route
                path="/SignUp"
                element={
                    <SignUp
                        Link={Link}
                        AuthContext={AuthContext}
                        ReactLoading={ReactLoading}
                        largura={largura}
                    />
                }

            />
        </Routes>
    )
}

export default AuthRoutes;