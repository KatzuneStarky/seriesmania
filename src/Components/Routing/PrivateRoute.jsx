import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
    return (
        <Route
            {...rest}
            element={(props) => {
                localStorage.getItem("token") ? (
                    <Element {...props} />
                ) : (
                    <Navigate to={"/login"} replace />
                );
            }}
        />
    );
};

export default PrivateRoute;
