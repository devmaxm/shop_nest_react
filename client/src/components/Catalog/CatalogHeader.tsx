import s from './Catalog.module.css'
import {Box} from "@mui/material";
import {CatalogType} from "../../types/catalog-types";

type PropsType = {
    catalog: CatalogType | null
}

function CatalogHeader(props: PropsType) {
    return (
        <div className={s.headerWrapper}>
            <Box className='container'>
                <h1 className={s.headerTitle}>{props.catalog?.category?.category}</h1>
            </Box>
        </div>
    )
}

export default CatalogHeader