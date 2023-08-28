import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Link, useOutletContext} from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {CategoryType, ColorType} from "../../../types/product-types";
import EditIcon from "@mui/icons-material/Edit";
import {PropsType} from "../../../types/admin/admin-categories-types";
import s from "../Admin.module.css";
import DeleteIcon from "@mui/icons-material/Delete";

function AdminCategoriesList() {
    const {categories, toggleModal} = useOutletContext<PropsType>()
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">Category</TableCell>

                        <TableCell align="left">Slug</TableCell>
                        <TableCell align="right">
                            <Link to={'add'}>
                                <AddBoxIcon color='primary'/>
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow
                            key={category.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">{category.id}</TableCell>
                            <TableCell align="left">{category.category}</TableCell>
                            <TableCell align="left">{category.slug}</TableCell>
                            <TableCell align="right" onClick={() => toggleModal('CATEGORY', category.id)}>
                                <DeleteIcon color='primary'/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminCategoriesList