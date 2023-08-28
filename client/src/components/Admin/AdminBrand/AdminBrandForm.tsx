import {Box, Button, Grid, TextField} from "@mui/material";
import React, {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {PropsType} from "../../../types/admin/admin-brand-types";
import s from "../Admin.module.css";

function AdminBrandForm(props: {isEdit: boolean}) {
    const [brandValue, changeBrandValue] = useState('')
    const [description, changeDescriptionValue] = useState('')
    const [slug, setSlug] = useState('')
    const {addBrand} = useOutletContext<PropsType>()
    return (
        <Grid container item md={6} xs={12} className={s.form_wrapper}>
            <h1 className={s.title}>Add brand</h1>
                <TextField
                    sx={{marginBottom: '20px'}}
                    id="Brand"
                    label="Brand"
                    variant="outlined"
                    value={brandValue}
                    onChange={(e) => changeBrandValue(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    sx={{marginBottom: '20px'}}
                    id="Description"
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => changeDescriptionValue(e.target.value)}
                    fullWidth
                    multiline
                />
                <TextField
                    sx={{marginBottom: '20px'}}
                    id="brand-slug"
                    label="Slug"
                    variant="outlined"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    fullWidth
                    multiline
                />
                <Button variant="contained" onClick={() => addBrand(brandValue, description, slug)}>Сохранить</Button>
        </Grid>
    )
}

export default AdminBrandForm