import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AdminLayout from '../pages/admin/AdminLayout';

const PrivateRoute = ({component: Component, ...rest}) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <Route {...rest} render={props => (
            user ?
            <AdminLayout>
                <Component {...props} />
            </AdminLayout>
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;