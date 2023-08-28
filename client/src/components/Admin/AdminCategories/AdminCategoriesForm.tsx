import React from "react";
import {useOutletContext} from "react-router-dom";
import {PropsType} from "../../../types/admin/admin-categories-types";
import {Box, Button, FormControl, Grid, InputLabel, Select, TextField} from "@mui/material";
import {useState} from "react";
import s from "../Admin.module.css";

function AdminCategoriesForm(props: { isEdit: boolean }) {
    const {addCategory, requiredProperties} = useOutletContext<PropsType>()
    const [categoryValue, changeCategoryValue] = useState('')
    const [slug, setSlug] = useState('')

    const [properties, setProperties] = useState<number[]>([])
    const handleChangeMultiple = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { options } = event.target;
        const value: number[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(parseInt(options[i].value));
            }
        }
        setProperties(value);
    };


    return (
        <Grid container item md={6} xs={12} className={s.form_wrapper}>
            <h1 className={s.title}>Add Category</h1>
                <TextField
                    className={s.form_input}
                    sx={{marginBottom: '20px'}}
                    id="Category"
                    label="Category"
                    variant="outlined"
                    value={categoryValue}
                    onChange={(e) => changeCategoryValue(e.target.value)}
                    fullWidth
                    required
                />

                <FormControl className={s.form_input}
                             sx={{marginBottom: '20px'}}
                             fullWidth
                >
                    <InputLabel shrink htmlFor="select-multiple-native">
                        Select Required Properties
                    </InputLabel>
                    <Select
                        multiple
                        native
                        value={properties}
                        fullWidth
                        // @ts-ignore Typings are not considering `native`
                        onChange={handleChangeMultiple}
                        label="Select Required Properties"
                        inputProps={{
                            id: 'select-multiple-native',
                        }}
                    >
                        {requiredProperties.map((property) => (
                            <option key={property.id} value={property.id}>
                                {property.property}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    className={s.form_input}
                    sx={{marginBottom: '20px'}}
                    id="category-slug"
                    label="Slug"
                    variant="outlined"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    fullWidth
                    required
                />
                <Button variant="contained" onClick={() => addCategory(categoryValue, slug, properties)}>Add category</Button>
        </Grid>
    )
}

export default AdminCategoriesForm