import {Outlet} from "react-router-dom";
import {Grid} from "@mui/material";
import s from './Auth.module.css'

function Auth() {

    return (
        <Grid container className={`full_screen_height ${s.auth_wrapper}`}>
            <Outlet />
        </Grid>
    )
}

export default Auth