import Filter from "./Filter";
import {Grid, Pagination, Stack} from "@mui/material";
import {CatalogType, FilterValuesType} from "../../../types/catalog-types";
import Products from "./Products";
import {CartType} from "../../../types/cart-types";
import {ProfileType} from "../../../types/profile-types";
import s from '../Catalog.module.css'
import CatalogPagination from "./CatalogPagination";
import React, {useRef} from "react";


type PropsType = {
    isAuth: boolean
    toggleModal: () => void

    profile: ProfileType | null
    addToFavorite: (productId: number) => void
    removeFromFavorite: (productId: number) => void

    catalog: CatalogType,

    cart: CartType
    addToCart: (productId: number, quantity: number) => void

    filterValues: FilterValuesType | null
    searchParams: any
    setSearchParams: any
}

function CatalogMain(props: PropsType) {
    const removeParam = (key: string, value: string) => {
        const params = props.searchParams.getAll(key).filter((p: string) => p !== value)
        if (params.length === 0) {
            props.searchParams.delete(key)
            props.setSearchParams(props.searchParams);
        } else {
            const newParams: { [key: string]: string[] } = {};
            props.searchParams.forEach((v: string, k: string) => {
                !newParams[k] ? newParams[k] = [v] : newParams[k].push(v);
            });
            props.setSearchParams({...newParams, [key]: params});
        }
    }
    const singleValueParam = (key: string, value: string) => {
        const newParams: { [key: string]: string[] } = {};
        props.searchParams.forEach((v: string, k: string) => {
            !newParams[k] ? newParams[k] = [v] : newParams[k].push(v);
        });

        if (value == "") {
            delete newParams[key]
        } else {
            newParams[key] = [value]
        }
        props.setSearchParams({...newParams});
    }
    const handleSearchParam = (key: string, value: string) => {
        const params = new URLSearchParams(props.searchParams);
        const isSingleValueParam = key === "max_price" || key === "min_price" || key === "price" || key === 'page'
        if (isSingleValueParam) {
            singleValueParam(key, value)
        } else {
            const isParamExist = params.getAll(key).includes(value)
            if (!isParamExist) {

                params.append(key, value)
                props.setSearchParams(params)
            }
            if (isParamExist) {
                removeParam(key, value)
            }
        }
    }

    const scrollToRef = useRef<HTMLDivElement>(null);
    const handleScrollTop = () => {
        scrollToRef.current?.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <Grid container sx={{marginTop: "50px"}} className='container'>
            <Grid item xl={3} lg={4} md={12} xs={12}>
                <Filter filterValues={props.catalog.filterValues} searchParams={props.searchParams}
                        setSearchParams={props.setSearchParams} handleSearchParam={handleSearchParam}/>
            </Grid>
            <Grid item xl={9} lg={8} xs={12}>
                <div ref={scrollToRef}></div>
                <Products cart={props.cart} catalog={props.catalog}
                          searchParams={props.searchParams} handleSearchParam={handleSearchParam}
                          addToCart={props.addToCart} addToFavorite={props.addToFavorite} profile={props.profile}
                          removeFromFavorite={props.removeFromFavorite} isAuth={props.isAuth}
                          toggleModal={props.toggleModal}
                />
                {props.catalog.productCount > props.catalog.pageSize && <CatalogPagination
                    productCount={props.catalog.productCount}
                    currentPage={props.catalog.currentPage}
                    pageSize={props.catalog.pageSize}
                    handleSearchParam={handleSearchParam}
                    searchParam={props.searchParams}
                    handleScrollTop={handleScrollTop}
                />}

            </Grid>

        </Grid>
    )
}


export default CatalogMain