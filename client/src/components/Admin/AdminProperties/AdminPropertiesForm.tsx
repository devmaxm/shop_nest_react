import {Box, Button, Grid, TextField} from "@mui/material";
import React, {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {PropsType} from "../../../types/admin/admin-properties-types";
import s from "../Admin.module.css";

function AdminPropertiesForm(props: {isEdit: boolean}) {
    const {addProperty} = useOutletContext<PropsType>()
    const [propertyValue, changePropertyValue] = useState('')
    const [slugValue, changeSlugValue] = useState('')

    return (
        <Grid container item md={6} xs={12} className={s.form_wrapper}>
            <h1 className={s.title}>Add Property</h1>
                <TextField
                    className={s.form_input}
                    sx={{marginBottom: '20px'}}
                    id="Property"
                    label="Property"
                    variant="outlined"
                    value={propertyValue}
                    onChange={(e) => changePropertyValue(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    sx={{marginBottom: '20px'}}
                    id="slug"
                    label="slug"
                    variant="outlined"
                    value={slugValue}
                    onChange={(e) => changeSlugValue(e.target.value)}
                    fullWidth
                    required
                />
                <Button variant="contained" onClick={() => addProperty(propertyValue, slugValue)}>Add property</Button>
        </Grid>
    )
}

export default AdminPropertiesForm