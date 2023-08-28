import {TableCell, TableRow} from "@mui/material";
import {NavLink} from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

type PropsType = {
    id: number,
    title: string,
    brand: string,
    category: string,
    colorHex: string,
    color: string,
    toggleModal: (modalType?: string, id?: number) => void
}

function ProductListItem(props: PropsType) {
    return (
        <TableRow
            key={props.id}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell component="th" scope="row">{props.id}</TableCell>
            <TableCell align="left"><NavLink to={`reviews/${props.id}`}>{props.title}</NavLink></TableCell>
            <TableCell align="left">{props.brand}</TableCell>
            <TableCell align="left">{props.category}</TableCell>
            <TableCell align="left">
                    <span style={{
                        background: `${props.colorHex}`,
                        width: '20px',
                        height: '20px',
                        border: '1px black solid',
                        display: 'inline-block'
                    }}></span>
                {props.color}
            </TableCell>
            <TableCell align="right" onClick={() => props.toggleModal('PRODUCT', props.id)}>
                <DeleteIcon color='primary'/>
            </TableCell>
        </TableRow>
    )
}

export default ProductListItem