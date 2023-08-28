import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import React, {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {PropsType} from "../../../types/admin/admin-model-types";
import {BrandType, CategoryType} from "../../../types/product-types";
import s from "../Admin.module.css";

function AdminModelsForm(props: { isEdit: boolean }) {
    const {addModel, categories, brands} = useOutletContext<PropsType>()
    const [modelValue, changeModelValue] = useState<string>('')
    const [slug, setSlug] = useState<string>('')
    const [category, setCategory] = useState<number>(0)
    const [brand, setBrand] = useState<number>(0)
    const handleCategory = (event: SelectChangeEvent) => setCategory(parseInt(event.target.value))
    const handleBrand = (event: SelectChangeEvent) => setBrand(parseInt(event.target.value))

    const handleAddModel = () => {
        if (modelValue !== '' && category !== 0 && brand !== 0) {
            addModel(modelValue, brand, category, slug)
            changeModelValue('')
            setCategory(0)
            setBrand(0)
        }
    }
    return (
        <Grid container item md={6} xs={12} className={s.form_wrapper}>
            <h1 className={s.title}>Add Model</h1>
                <TextField
                    sx={{marginBottom: '20px'}}
                    id="Model"
                    label="Model"
                    variant="outlined"
                    value={modelValue}
                    onChange={(e) => changeModelValue(e.target.value)}
                    fullWidth
                    required
                />
                <FormControl fullWidth required sx={{marginBottom: '20px'}}>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category.toString()}
                        label="Category"
                        onChange={handleCategory}

                    >
                        <MenuItem value={0}>---</MenuItem>
                        {categories.map((c: CategoryType) => {
                            return <MenuItem value={c.id}>{c.category}</MenuItem>
                        })}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{marginBottom: '20px'}}>
                    <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={brand.toString()}
                        label="Brand"
                        onChange={handleBrand}
                    >
                        {brands.map((b: BrandType) => {
                            return <MenuItem value={b.id}>{b.brand}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                <TextField
                    sx={{marginBottom: '20px'}}
                    id="model-slug"
                    label="model-slug"
                    variant="outlined"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    fullWidth
                    required
                />
                <Button variant="contained" onClick={handleAddModel}>Схоранить</Button>
        </Grid>
    )
}

export default AdminModelsForm