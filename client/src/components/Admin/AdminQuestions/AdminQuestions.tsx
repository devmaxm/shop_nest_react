import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import s from '../Admin.module.css'
import DeleteIcon from '@mui/icons-material/Delete';
import {QuestionType} from "../../../types/store/admin-reducer-types";

type PropsType = {
    questions: QuestionType[]

    toggleModal: (modalType?: string, id?: number) => void
}

function AdminQuestions(props: PropsType) {
    return (
        <TableContainer>
            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">email</TableCell>
                        <TableCell align="left">question</TableCell>
                        <TableCell align="right">delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.questions.map((question) => (
                        <TableRow
                            key={question.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">{question.id}</TableCell>
                            <TableCell align="left">{question.email}</TableCell>
                            <TableCell align="left">{question.question}</TableCell>
                            <TableCell align="right">
                                <button className={s.delete_btn} onClick={() => props.toggleModal("QUESTION", question.id)}>
                                    <DeleteIcon color='primary'/>
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminQuestions