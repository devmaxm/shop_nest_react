import {Grid} from "@mui/material";
import s from './Other.module.css'
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {StoreType} from "../../types/store/store";
import {toggleModal} from "../../store/actions/auth";

type PropsType = {
    isOpen: boolean
    toggleModal: () => void
}

function UnauthorizedModal(props: PropsType) {
    const handleModal = () => {
        document.body.className = props.isOpen ? '' : 'modal_open'
        props.toggleModal()
    }
    return (
        <Grid className={`${s.unauthorized_wrapper} ${props.isOpen && s.active}`}>
            <div className={`${s.modal_background} ${props.isOpen && s.active}`}></div>
            <Grid item className={s.content_wrapper}>
                <button className={s.close_btn} onClick={handleModal}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.7688 10.0096L19.6335 2.14481C20.1222 1.65659 20.1222 0.864449 19.6335 0.376237C19.1449 -0.112391 18.3536 -0.112391 17.865 0.376237L10.0002 8.24099L2.13504 0.376237C1.64641 -0.112391 0.8551 -0.112391 0.366471 0.376237C-0.122157 0.864449 -0.122157 1.65659 0.366471 2.14481L8.23164 10.0096L0.366471 17.8743C-0.122157 18.3625 -0.122157 19.1547 0.366471 19.6429C0.610786 19.8868 0.930979 20.0089 1.25076 20.0089C1.57053 20.0089 1.89073 19.8868 2.13504 19.6425L10.0002 11.7777L17.865 19.6425C18.1093 19.8868 18.4295 20.0089 18.7492 20.0089C19.069 20.0089 19.3892 19.8868 19.6335 19.6425C20.1222 19.1542 20.1222 18.3621 19.6335 17.8739L11.7688 10.0096Z"
                            fill="black"></path>
                    </svg>
                </button>
                <h1 className={s.modal_title}>Вы не авторизованы</h1>
                <p className='text' style={{marginBottom: "20px"}}>Это действие требует авторизации. Авторизуйтесь, пожалуйста, для продолжения.</p>
                <Grid container item xs={12}>
                    <Grid item xs={6} className={s.button_wrapper}>
                        <NavLink className={s.button} to='/auth/login' onClick={handleModal}>Войти</NavLink>
                    </Grid>
                    <Grid item xs={6} className={s.button_wrapper}>
                        <button onClick={handleModal} className={`${s.button} ${s.white}`}>Отмена</button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

const mapStateToPops = (state: StoreType) => {
    return {
        isOpen: state.auth.isOpenModal
    }
}
export default connect(mapStateToPops, {toggleModal})(UnauthorizedModal)