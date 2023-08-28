import React, {useEffect} from 'react'
import { Navigate } from "react-router-dom";
import {checkAuth} from "../store/actions/auth";
import {connect} from "react-redux";
import {StoreType} from "../types/store/store";

interface OnlyAuthComponentProps {
    isAuth: boolean;
    children: JSX.Element
    checkAuth: () => void
}

function OnlyAuthComponent ({children, isAuth, checkAuth}: OnlyAuthComponentProps) {
    useEffect(() => {
        checkAuth()
    }, [])

    return isAuth ? children : <Navigate to={"/auth/login"} />
};

const mapStateToProps = (state:StoreType) => {
    return {

    }
}
export default connect(mapStateToProps, {checkAuth})(OnlyAuthComponent)