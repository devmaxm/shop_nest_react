import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Link, useOutletContext} from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {ModelWithRelationsType, RequiredPropertyType} from "../../../types/product-types";
import EditIcon from "@mui/icons-material/Edit";
import {PropsType} from "../../../types/admin/admin-model-types";

function AdminModelsList() {
    const {models} = useOutletContext<PropsType>()
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">Model</TableCell>
                        <TableCell align="left">Category</TableCell>
                        <TableCell align="left">Brand</TableCell>
                        <TableCell align="right">
                            <Link to={'add'}>
                                <AddBoxIcon color='primary'/>
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {models.map((model: ModelWithRelationsType) => (
                        <TableRow
                            key={model.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">{model.id}</TableCell>
                            <TableCell align="left">{model.model}</TableCell>
                            <TableCell align="left">{model.category ? model.category.category : ""}</TableCell>
                            <TableCell align="left">{model.brand ? model.brand.brand : ""}</TableCell>
                            <TableCell align="right"><Link to={`edit/${model.id}`}><EditIcon
                                color='primary'/></Link></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminModelsList