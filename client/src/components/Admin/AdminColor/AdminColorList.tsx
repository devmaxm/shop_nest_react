import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Link, useOutletContext} from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {ColorType} from "../../../types/product-types";
import DeleteIcon from "@mui/icons-material/Delete";
import {PropsType} from "./AdminColor";


function AdminColorList() {
    const {colors, toggleModal} = useOutletContext<PropsType>()
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">Color</TableCell>

                        <TableCell align="left">Hex</TableCell>
                        <TableCell align="right">
                            <Link to={'add'}>
                                <AddBoxIcon color='primary'/>
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {colors.map((color: ColorType) => (
                        <TableRow
                            key={color.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">{color.id}</TableCell>
                            <TableCell align="left">{color.color}</TableCell>
                            <TableCell align="left">
                                <span style={{background: `${color.hex}`, width: '20px', height: '20px', border: '1px black solid', display: 'inline-block'}}></span>
                                {color.hex}
                            </TableCell>
                            <TableCell align="right" onClick={() => toggleModal('COLOR', color.id)}>
                                <DeleteIcon color='primary'/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminColorList