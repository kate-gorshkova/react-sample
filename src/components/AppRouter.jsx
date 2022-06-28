import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from '../context';
import Error from '../pages/Error';
import { publicRoutes, privateRoutes } from '../router';
import Loader from './UI/Loader/Loader';

function AppRouter() {
    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <Loader/>
    }

    return (
        <Routes>
        {isAuth
            ? privateRoutes.map(route =>
                <Route
                    element={route.component}
                    path={route.path}
                    key={route.path}/>
            )
            : publicRoutes.map(route =>
                <Route
                    element={route.component}
                    path={route.path}
                    key={route.path}/>
            )
        }
        {isAuth
            ? <>
                <Route path="/" element={<Navigate to="/posts" replace />} />
                <Route path="*" element={<Navigate to="/error" replace />} />
                <Route path="/login" element={<Navigate to="/posts" replace />} />
                <Route path="/error" element={<Error />} />
            </>
            : <Route path="*" element={<Navigate to="/login" replace />} />
        }

        </Routes>
    )
}

export default AppRouter
