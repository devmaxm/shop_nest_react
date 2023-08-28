import {connect} from "react-redux";
import {StoreType} from "../../types/store/store";
import {
    deleteBrand,
    deleteCategory,
    deleteColor, deleteModel,
    deleteProduct, deleteProperty,
    deleteQuestion,
    toggleModal
} from "../../store/actions/admin";
import {DeleteModalType} from "../../types/store/admin-reducer-types";

import s from './Other.module.css'
import {Grid} from "@mui/material";

type PropsType = {
    modal: DeleteModalType
    toggleModal: (modalType?: string, id?: number) => void
    deleteQuestion: (questionId: number) => void
    deleteProduct: (productId: number) => void
    deleteColor: (id: number) => void
    deleteCategory: (id: number) => void
    deleteBrand: (id: number) => void
    deleteModel: (id: number) => void
    deleteProperty: (id: number) => void
}

function DeleteModal(props: PropsType) {
    const handleModal = () => {
        document.body.className = props.modal.isActive ? '' : 'modal_open'
        props.toggleModal()
    }
    const handleDelete = () => {
        props.modal.type === "PRODUCT" && props.deleteProduct(props.modal.id)
        props.modal.type === "QUESTION" && props.deleteQuestion(props.modal.id)
        props.modal.type === "COLOR" && props.deleteColor(props.modal.id)
        props.modal.type === "CATEGORY" && props.deleteCategory(props.modal.id)
        props.modal.type === "BRAND" && props.deleteBrand(props.modal.id)
        props.modal.type === "MODEL" && props.deleteModel(props.modal.id)
        props.modal.type === "PROPERTY" && props.deleteProperty(props.modal.id)
        handleModal()
    }

    return (
        <Grid className={`${s.unauthorized_wrapper} ${props.modal.isActive && s.active}`}>
            <div className={`${s.modal_background} ${props.modal.isActive && s.active}`}></div>
            <Grid item className={s.content_wrapper}>
                <button className={s.close_btn} onClick={() => handleModal()}>
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
                <h1 className={s.modal_title}>Удаление</h1>
                <p className='text' style={{marginBottom: "20px"}}>Вы уверены, что хотите удалить?</p>
                <Grid container item xs={12}>
                    <Grid item xs={6} className={s.button_wrapper}>
                        <button className={s.button} onClick={handleDelete}>Удалить</button>
                    </Grid>
                    <Grid item xs={6} className={s.button_wrapper}>
                        <button onClick={handleModal} className={`${s.button} ${s.white}`}>Отмена</button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state: StoreType) => {
    return {
        modal: state.admin.deleteModal
    }
}
export default connect(mapStateToProps, {
    deleteQuestion,
    deleteProduct,
    toggleModal,
    deleteBrand,
    deleteCategory,
    deleteColor,
    deleteModel,
    deleteProperty
})(DeleteModal)