import React from "react";
import s from '../Admin.module.css'
import {
    Button,
    FormControl, Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {useOutletContext} from "react-router-dom";
import {ColorType, ModelWithRelationsType, RequiredPropertyType} from "../../../types/product-types";
import {ReactNode, useState} from "react";
import {PropsType} from "./AdminProduct";

function AdminProductForm(props: { isEdit: boolean }) {
    const {
        brand,
        category,
        requiredFields,
        colors,
        models,
        setRequiredFields,
        addProduct,
    } = useOutletContext<PropsType>()

    const [color, setColor] = useState<number>(0)
    const [model, setModel] = useState<number>(0)
    const [title, setTitle] = useState<string>('')
    const [code, setCode] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [sale, setSale] = useState<string>('')
    const [slug, setSlug] = useState<string>('')
    const [availableQuantity, setAvailableQuantity] = useState<string>('')
    const [mainImage, setMainImage] = useState<File | null>(null)
    const [otherImages, setOtherImages] = useState<FileList | null>(null)
    const [formData, setFormData] = useState<InputValues>({});
    const handleColor = (event: SelectChangeEvent) => {
        setColor(parseInt(event.target.value))
    }
    const handleModel = (event: SelectChangeEvent) => {
        const modelId = parseInt(event.target.value)
        setModel(modelId)
        setRequiredFields(modelId)

    }
    const handleMainImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (files) {
            setMainImage(files?.item(0))
        }
    }
    const handleOtherImages = (event: React.ChangeEvent<HTMLInputElement>) => {
        const images = event.target.files
        if (images) {
            setOtherImages(images)
        }
    }
    const generateOtherImagesName = (fileList: FileList): string[] => {
        const names = []
        for (let i = 0; i < fileList.length; i++) {
            names.push(fileList[i].name)
        }
        return names

    }
    type InputValues = {
        [key: string]: string
    }

    const requireField = (property: string): ReactNode => {
        return <TextField
            className={s.form_input}
            sx={{marginBottom: '20px'}}
            id={property}
            label={property}
            variant="outlined"
            value={formData[property] || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFormData({
                    ...formData,
                    [property]: event.target.value,
                })
            }
            }
            fullWidth
            required
        />
    }
    const createProductHandler = () => {
        const properties = []
        for (const [key, value] of Object.entries(formData)) {
            const slug = requiredFields?.find(filed => filed.property === key)
            if (slug) {
                properties.push({property: key, propertyValue: value, propertySlug: slug.slug})
            }

        }
        if (title && description && price && sale && color && availableQuantity && mainImage && model && properties && category && brand && otherImages) {
            const categoryId = category.id
            const brandId = brand.id
            addProduct(
                title,
                description,
                price,
                sale,
                color.toString(),
                availableQuantity,
                mainImage,
                otherImages,
                model.toString(),
                properties,
                categoryId.toString(),
                brandId.toString(),
                slug,
                code
            )
        }

    }

    return (
        <Grid container item md={6} xs={12} className={s.form_wrapper}>
            <h1 className={s.title}>Add Product</h1>
                <TextField
                    sx={{marginBottom: '20px'}}
                    id="Title"
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    sx={{marginBottom: '20px'}}
                    id="Description"
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    required
                    multiline
                />
                <TextField
                    sx={{marginBottom: '20px'}}
                    id="code"
                    label="Code"
                    variant="outlined"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    fullWidth
                    required
                    multiline
                />
                <TextField
                    sx={{marginBottom: '20px'}}
                    id="PriceUAN"
                    label="PriceUAN"
                    variant="outlined"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    required
                    multiline
                />
                <TextField
                    sx={{marginBottom: '20px'}}
                    id="sale"
                    label="Sale %"
                    variant="outlined"
                    value={sale}
                    onChange={(e) => setSale(e.target.value)}
                    fullWidth
                    required
                    multiline
                />
                {/*Select color*/}
                <FormControl fullWidth required sx={{marginBottom: '20px'}}>
                    <InputLabel id="demo-simple-select-label">Color</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={color.toString()}
                        label="Category"
                        onChange={handleColor}

                    >
                        <MenuItem value={0}>---</MenuItem>
                        {colors.map((c: ColorType) => {
                            return <MenuItem value={c.id}>
                                <span style={{
                                    background: `${c.hex}`,
                                    width: '20px',
                                    height: '20px',
                                    border: '1px black solid',
                                    display: 'inline-block'
                                }}></span>
                                {c.color}
                            </MenuItem>
                        })}
                    </Select>
                </FormControl>

                <TextField
                    sx={{marginBottom: '20px'}}
                    fullWidth
                    id='availableQuantity'
                    label="Available Quantity"
                    variant="outlined"
                    value={availableQuantity}
                    onChange={(e) => setAvailableQuantity(e.target.value)}
                    required
                />

                <Button
                    className={s.form_button}
                    variant="contained"
                    component="label">
                    <input type="file" hidden onChange={handleMainImage}/>
                    Загрузить сновное фото
                </Button>

                {mainImage && <div style={{margin: "auto"}}>{mainImage.name}</div>}

                <Button
                    className={s.form_button}
                    variant="contained"
                    component="label">
                    <input type="file" hidden multiple onChange={handleOtherImages}/>
                    Выбрать другие фото
                </Button>

                {otherImages ? generateOtherImagesName(otherImages).map(i => <div
                    style={{margin: "auto"}}>{i}</div>) : ''}
                {/*Select model*/}
                <FormControl fullWidth required sx={{marginBottom: '20px'}}>
                    <InputLabel id="demo-simple-select-label">Model</InputLabel>
                    <Select
                        labelId="Model"
                        id="Model"
                        value={model.toString()}
                        label="Category"
                        onChange={handleModel}

                    >
                        <MenuItem value={0}>---</MenuItem>
                        {models.map((m: ModelWithRelationsType) => {
                            return <MenuItem value={m.id}>
                                {m.model}
                            </MenuItem>
                        })}
                    </Select>
                </FormControl>
                {/*Required fields*/}
                {requiredFields ? requiredFields.map((field: RequiredPropertyType) => requireField(field.property)) : ""}
                {brand ? <TextField
                    sx={{marginBottom: '20px'}}
                    fullWidth
                    id={brand.brand}
                    label={`Brand: ${brand.brand}`}
                    variant="outlined"
                    disabled
                /> : ""}
                {category ? <TextField
                    sx={{marginBottom: '20px'}}
                    fullWidth
                    id={category.category}
                    label={`Category: ${category.category}`}
                    variant="outlined"
                    disabled
                /> : ""}
                <TextField
                    sx={{marginBottom: '20px'}}
                    fullWidth
                    id='slug'
                    label="slug"
                    variant="outlined"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                />
                <Button onClick={createProductHandler} className={s.form_button}>Загрузить</Button>
        </Grid>
    )
}

export default AdminProductForm