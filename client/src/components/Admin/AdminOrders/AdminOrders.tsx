import {Order} from "../../../types/cart-types";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Link} from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {ModelWithRelationsType} from "../../../types/product-types";
import EditIcon from "@mui/icons-material/Edit";

type PropsType = {
    orders: Order[]
}

function AdminOrders(props: PropsType) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="left">fullName</TableCell>
                        <TableCell align="left">number</TableCell>
                        <TableCell align="left">email</TableCell>
                        <TableCell align="left">amount</TableCell>
                        <TableCell align="left">totalPrice</TableCell>
                        <TableCell align="left">totalDiscountPrice</TableCell>
                        <TableCell align="right">delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.orders.map((order) => (
                        <TableRow
                            key={order.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">{order.id}</TableCell>
                            <TableCell align="left">{order.fullName}</TableCell>
                            <TableCell align="left">{order.phoneNumber}</TableCell>
                            <TableCell align="left">{order.email}</TableCell>
                            <TableCell align="left">{order.products.length}</TableCell>
                            <TableCell align="left">{order.totalPrice}</TableCell>
                            <TableCell align="left">{order.totalDiscountPrice}</TableCell>
                            {/*<TableCell align="right"><Link to={`edit/${model.id}`}><EditIcon*/}
                            {/*    color='primary'/></Link></TableCell>*/}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminOrders