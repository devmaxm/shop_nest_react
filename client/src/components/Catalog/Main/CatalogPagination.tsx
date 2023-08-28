import s from "../Catalog.module.css";
import {Pagination, Stack} from "@mui/material";
import React, {useState} from "react";


type PropsType = {
    currentPage: number,
    pageSize: number,
    productCount: number
    handleSearchParam: (key: string, value: string) => void,
    searchParam: any
    handleScrollTop: () => void
}

function CatalogPagination(props: PropsType) {
    const [page, setPage] = useState<number>(parseInt(props.searchParam.get("page")) || 1);
    const pagesCount = Math.ceil(props.productCount / props.pageSize)
    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        if (props.currentPage > 0) {
            props.handleSearchParam("page", `${value}`)
            setPage(value)
            props.handleScrollTop()
        }
    }

    return (
        <Stack spacing={2} className={s.pagination_wrapper}>
            <Pagination count={pagesCount} color="primary" className={s.pagination} page={page} onChange={handlePagination}/>
        </Stack>
    )
}

export default CatalogPagination