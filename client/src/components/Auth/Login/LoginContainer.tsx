import {connect} from "react-redux";
import {login} from "../../../store/actions/auth";

import Login from "./Login";
import {StoreType} from "../../../types/store/store";
import {LoginPropsType} from "../../../types/auth-types";
import {useEffect} from "react";

function LoginContainer(props: LoginPropsType) {
    useEffect(() => {
        document.title = "Вход"
    }, [])
    return <Login login={props.login}
                  error={props.error}
    />
}

const mapStateToProps = (store: StoreType) => {
    return {
        error: store.auth.error
    }
}

export default connect(mapStateToProps, {
    login,
})(LoginContainer)