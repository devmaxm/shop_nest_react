import MainPage from "./MainPage";
import {connect} from "react-redux";
import {StoreType} from "../../types/store/store";
import {useEffect} from "react";

function ContainerMainPage() {
    useEffect(() => {
        document.title = "Главная"
    }, [])
    return <MainPage />
}

const mapStateToProps = (state: StoreType) => {
    return {

    }
}

export default connect(mapStateToProps, {})(ContainerMainPage)