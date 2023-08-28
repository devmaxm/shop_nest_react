import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Link, useOutletContext} from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {RequiredPropertyType} from "../../../types/product-types";

import {PropsType} from "../../../types/admin/admin-properties-types";
import DeleteIcon from "@mui/icons-material/Delete";

function AdminPropertiesList() {
    const {properties, toggleModal} = useOutletContext<PropsType>()
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">Property</TableCell>
                        <TableCell align="right">
                            <Link to={'add'}>
                                <AddBoxIcon color='primary'/>
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {properties.map((property: RequiredPropertyType) => (
                        <TableRow
                            key={property.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">{property.id}</TableCell>
                            <TableCell align="left">{property.property}</TableCell>
                            <TableCell align="right" onClick={() => toggleModal("PROPERTY", property.id)} sx={{cursor: 'pointer'}}>
                                <DeleteIcon color='primary'/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminPropertiesList