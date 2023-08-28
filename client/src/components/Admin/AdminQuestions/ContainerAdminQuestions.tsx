import AdminQuestions from "./AdminQuestions";
import {connect} from "react-redux";
import {StoreType} from "../../../types/store/store";
import {deleteQuestion, loadQuestions, toggleModal} from "../../../store/actions/admin";
import {QuestionType} from "../../../types/store/admin-reducer-types";
import {useEffect} from "react";

type PropsType = {
    questions: QuestionType[]
    loadQuestions: () => void

    toggleModal: (modalType?: string, id?: number) => void
}

function ContainerAdminQuestions(props: PropsType) {
    useEffect(() => {
        props.loadQuestions()
    }, [])
    return <AdminQuestions questions={props.questions} toggleModal={props.toggleModal}/>
}


const mapStateToProps = (state: StoreType) => {
    return {
        questions: state.admin.question.questions
    }
}
export default connect(mapStateToProps, {loadQuestions, toggleModal})(ContainerAdminQuestions)