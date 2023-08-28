import {StoreType} from "../../types/store/store";
import {connect} from "react-redux";
import Auth from "./Auth";
import {Navigate} from "react-router-dom";

type PropsType = {
    isAuth: boolean
}

function AuthContainer(props: PropsType) {
    return props.isAuth ? <Navigate to='/' /> : <Auth />
}

const mapStateToProps = (state: StoreType) => {
    return {
        isAuth: state.auth.isAuth
    }
}
export default connect(mapStateToProps, {})(AuthContainer)