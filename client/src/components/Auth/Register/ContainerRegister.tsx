import {connect} from "react-redux";
import {StoreType} from "../../../types/store/store";
import Register from "./Register";
import {RegisterPropsType} from "../../../types/auth-types";
import {register} from "../../../store/actions/auth";
import {useEffect} from "react";

function ContainerRegister(props: RegisterPropsType) {
    useEffect(() => {
        document.title = "Регистрация"
    }, [])
    return <Register error={props.error} register={props.register}/>
}

const mapStateToProps = (state:StoreType) => {
    return {
        error: state.auth.error
    }
}
export default connect(mapStateToProps, {register})(ContainerRegister)