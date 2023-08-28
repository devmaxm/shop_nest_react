import s from '../Catalog.module.css'
import {Checkbox, FormControlLabel, Grid} from "@mui/material";
import {FilterValuesType} from "../../../types/catalog-types";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import debounce from "lodash.debounce";

type PropsType = {
    handleSearchParam: (key: string, value: string) => void
    filterValues: FilterValuesType | null

    searchParams: any
    setSearchParams: any
}

function Filter(props: PropsType) {
    const [mobileFilters, setMobileFilters] = useState<boolean>(false)
    const toggleMobileFilers = () => {
        setMobileFilters(mobileFilters ? false : true)
    }
    const clearFilters = () => {
        props.setSearchParams({})
        toggleMobileFilers()
    }


    const modelFilter = props.filterValues?.availableModels?.map((model) => {
        return (
            <FormControlLabel
                key={model.slug}
                className={`${s.filterCheckBox} ${props.searchParams.getAll('model').includes(model.slug) && s.filterCheckBox_active}`}
                control={<Checkbox checked={props.searchParams.getAll('model').includes(model.slug)}/>}
                onChange={() => props.handleSearchParam('model', model.slug)}
                label={
                    <span style={{display: 'flex', alignItems: "center"}}>
                        <div style={{marginLeft: "10px"}}
                             className={
                                 `${s.filterParam} ${props.searchParams.getAll('model').includes(model.slug) && s.filterParam_active}`
                             }>{model.model}</div>
                    </span>
                }
            />
        )
    })

    const checkModels = modelFilter?.length ? true : false
    const colorsFilter = props.filterValues?.availableColors?.map((color) => {
        return (
            <FormControlLabel
                key={color.id}
                className={`${s.filterCheckBox} ${props.searchParams.getAll('color').includes(color.slug) && s.filterCheckBox_active}`}
                control={<Checkbox checked={props.searchParams.getAll('color').includes(color.slug)}/>}
                onChange={() => props.handleSearchParam('color', color.slug)}
                label={
                    <span style={{display: 'flex', alignItems: "center"}}>
                                        <div style={{
                                            width: "30px",
                                            height: "30px",
                                            border: "1px solid #e0e0e0",
                                            backgroundColor: `${color.hex}`
                                        }}></div>
                                        <div style={{marginLeft: "10px"}}
                                             className={
                                                 `${s.filterParam} ${props.searchParams.getAll('color').includes(color.slug) && s.filterParam_active}`}>{color.color}</div>
                                    </span>
                }
            />)
    })
    const checkColors = colorsFilter?.length ? true : false
    const propsFilter = props.filterValues?.availableProperties?.map((p) => {
        return (
            <div key={p.slug} className={s.filterBlock}>
                <p>{p.name}: </p>
                <Grid container className={s.filterCheckBox_Container}>

                    {p.values.map(value => {
                        return (
                            <FormControlLabel
                                key={value}
                                className={`${s.filterCheckBox} ${props.searchParams.getAll(p.slug).includes(value) && s.filterCheckBox_active}`}
                                control={<Checkbox checked={props.searchParams.getAll(p.slug).includes(value)}/>}
                                onChange={() => props.handleSearchParam(p.slug, value)}
                                label={
                                    <span style={{display: 'flex', alignItems: "center"}}>
                                        <div style={{marginLeft: "10px"}}
                                             className={
                                                 `${s.filterParam} ${props.searchParams.getAll(p.slug).includes(value) && s.filterParam_active}`}
                                        >{value}</div>
                                    </span>
                                }
                            />)
                    })}
                </Grid>
            </div>
        )
    })

    const categoryFilter = props.filterValues?.availableCategories?.map((category) => {
        return <NavLink to={`/c/${category.slug}`} className={s.filter_link}>{category.category}</NavLink>
    })
    const checkCategories = categoryFilter?.length ? true : false

    const mobileFilterModels = <div className={s.mobile_filter_block}>
        <p className={s.mobile_filter_block__title}>Модель</p>
        {props.filterValues?.availableModels?.map((model) => {
            return <FormControlLabel
                key={model.id}
                className={`${s.mobile_filter_block__property_name} ${props.searchParams.getAll('model').includes(model.slug) && s.checked}`}
                label={model.model}
                control={<Checkbox
                    checked={props.searchParams.getAll('model').includes(model.slug)}
                />}
                onChange={() => props.handleSearchParam('model', model.slug)}
            />
        })}
    </div>
    const mobileFilterColors = <div className={s.mobile_filter_block}>
        <p className={s.mobile_filter_block__title}>Цвет</p>
        {props.filterValues?.availableColors?.map((color) => {
            return <FormControlLabel
                key={color.id}
                className={`${s.mobile_filter_block__property_name} ${props.searchParams.getAll('color').includes(color.slug) && s.checked}`}
                label={color.color}
                control={<Checkbox
                    checked={props.searchParams.getAll('color').includes(color.slug)}
                />}
                onChange={() => props.handleSearchParam('color', color.slug)}
            />
        })}
    </div>
    const mobileFilterProps = props.filterValues?.availableProperties?.map((p) => {

        return (
            <div className={s.mobile_filter_block} key={p.slug}>
                <p className={s.mobile_filter_block__title}>{p.name}</p>
                {p.values.map((value) => {
                    return <FormControlLabel
                        key={value}
                        className={`${s.mobile_filter_block__property_name} ${props.searchParams.getAll(p.slug).includes(value) && s.checked}`}
                        label={value}
                        control={<Checkbox
                            checked={props.searchParams.getAll(p.slug).includes(value)}
                        />}
                        onChange={() => props.handleSearchParam(p.slug, value)}
                    />
                })}
            </div>
        )
    })

    const [maxPrice, setMaxPrice] = useState(props.searchParams.get('max_price') || '')
    const [minPrice, setMinPrice] = useState(props.searchParams.get('min_price') || '')
    //debounce max price input
    useEffect(() => {
        const handleMaxPriceParam = debounce((maxPrice) => {
            props.handleSearchParam('max_price', maxPrice);
        }, 1000);
        handleMaxPriceParam(maxPrice);

        return () => {
            handleMaxPriceParam.cancel();
        };
    }, [maxPrice]);

    //debounce min price input
    useEffect(() => {
        const handleMinPriceParam = debounce((minPrice) => {
            props.handleSearchParam('min_price', minPrice);
        }, 1000);
        handleMinPriceParam(minPrice);

        return () => {
            handleMinPriceParam.cancel();
        };
    }, [minPrice]);


    return (
        <>
            <div className={s.filterDesktop}>
                <p className={s.filterTitle}>Фильтрация</p>
                {/*Price*/}
                <div className={s.filterBlock}>
                    <p>Цена: </p>
                    <Grid container>
                        <input placeholder='От' className={s.priceInput}
                               value={minPrice}
                               onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input placeholder='До' className={s.priceInput}
                               value={maxPrice}
                               onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </Grid>
                </div>

                {checkCategories && <div className={s.filterBlock}>
                    <p>Категория: </p>
                    <Grid container className={s.filterCheckBox_Container}>
                        {categoryFilter}
                    </Grid>
                </div>}

                {checkModels && <div className={s.filterBlock}>
                    <p>Модель: </p>
                    <Grid container className={s.filterCheckBox_Container}>
                        {modelFilter}
                    </Grid>
                </div>}

                {checkColors && <div className={s.filterBlock}>
                    <p>Цвет: </p>
                    <Grid container className={s.filterCheckBox_Container}>
                        {colorsFilter}
                    </Grid>
                </div>}

                {propsFilter}
            </div>


            <div className={s.filterMobile}>
                <p className='link' onClick={toggleMobileFilers}>Показать все фильтры</p>
                {mobileFilters && <div className={s.mobileFilter} onClick={toggleMobileFilers}></div>}
                {mobileFilters && <div className={s.filterWrapper_mobile}>
                    <button className={s.close_filter_btn} onClick={toggleMobileFilers}>X</button>
                    <h1 className={s.mobile_filter_title}>Фильтры</h1>
                    <div className={s.mobile_filter_list}>
                        {checkModels && mobileFilterModels}
                        {checkColors && mobileFilterColors}
                        {mobileFilterProps}
                    </div>
                    <div className={s.mobile_filter_nav}>
                        <button className={`${s.filter_btn} btn outlined`} onClick={clearFilters}>Сбросить</button>
                        <button className={`${s.filter_btn} btn`} onClick={toggleMobileFilers}>Принять</button>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default Filter