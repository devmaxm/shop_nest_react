import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Link, useOutletContext} from "react-router-dom";
import AddBoxIcon from '@mui/icons-material/AddBox';
import ProductListItem from "./ProductListItem";
import {PropsType} from "./AdminProduct";

function AdminProductList() {
    const {products, toggleModal} = useOutletContext<PropsType>()


    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">Title</TableCell>
                        <TableCell align="left">Brand</TableCell>
                        <TableCell align="left">Category</TableCell>
                        <TableCell align="left">Color</TableCell>
                        <TableCell align="right">
                            <Link to={'add'}>
                                <AddBoxIcon color='primary'/>
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <ProductListItem id={product.id} category={product.color.hex} colorHex={product.color.hex}
                                         color={product.color.color} brand={product.brand.brand} title={product.title}
                                         toggleModal={toggleModal}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminProductList