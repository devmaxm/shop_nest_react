import {Link, useOutletContext} from "react-router-dom";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {BrandType} from "../../../types/product-types";

import {PropsType} from "../../../types/admin/admin-brand-types";
import DeleteIcon from "@mui/icons-material/Delete";

function AdminBrandList() {
    const {brands, toggleModal} = useOutletContext<PropsType>()
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">Brand</TableCell>

                        <TableCell align="left">Description</TableCell>
                        <TableCell align="right">
                            <Link to={'add'}>
                                <AddBoxIcon color='primary'/>
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {brands.map((brand: BrandType) => (
                        <TableRow
                            key={brand.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">{brand.id}</TableCell>
                            <TableCell align="left">{brand.brand}</TableCell>
                            <TableCell align="left">
                                {brand.description}
                            </TableCell>
                            <TableCell align="right" onClick={() => toggleModal("BRAND", brand.id)}>
                                <DeleteIcon color='primary'/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminBrandList