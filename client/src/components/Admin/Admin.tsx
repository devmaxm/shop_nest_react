import AdminNav from "./AdminNav/AdminNav";
import s from './Admin.module.css'
import {Outlet} from "react-router-dom";
import {Grid} from "@mui/material";
import DeleteModal from "../Other/DeleteModal";

function Admin() {
    return (
        <Grid container className={`${s.admin_wrapper} full_screen_height`}>
            <DeleteModal  />
            <AdminNav />
            <Grid container item xs={12} className={s.admin_wrapper}>
                <Outlet />
            </Grid>
        </Grid>
    )
}

export default Admin