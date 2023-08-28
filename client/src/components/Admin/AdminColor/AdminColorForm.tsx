import {Box, TextField, Button, Grid} from "@mui/material";
import {useOutletContext} from "react-router-dom";
import React, {useState} from "react";
import s from "../Admin.module.css";
import {PropsType} from "./AdminColor";

function AdminColorForm(props: {isEdit: boolean}) {
    const [color, setColor] = useState<string>('')
    const [hex, setHex] = useState<string>('')
    const [slug, setSlug] = useState<string>('')
    const {addColor} = useOutletContext<PropsType>()
    return (
        <Grid container item md={6} xs={12} className={s.form_wrapper}>
            <h1 className={s.title}>Add Color</h1>
                <TextField
                    sx={{marginBottom: '20px'}}
                    id="Color"
                    label="Color"
                    variant="outlined"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    className={s.form_input}
                    sx={{marginBottom: '20px'}}
                    id="Hex"
                    label="Hex"
                    variant="outlined"
                    value={hex}
                    onChange={(e) => setHex(e.target.value)}
                    fullWidth
                    multiline
                    required
                />
                <TextField
                    className={s.form_input}
                    sx={{marginBottom: '20px'}}
                    id="color-slug"
                    label="Slug"
                    variant="outlined"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    fullWidth
                    multiline
                    required
                />
                <Button variant="contained" onClick={() => addColor(color, hex, slug)}>Contained</Button>
        </Grid>
    )
}

export default AdminColorForm