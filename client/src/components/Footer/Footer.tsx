import s from './Footer.module.css'
import {Grid} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import {CategoryWithModelsType} from "../../types/product-types";

export type PropsType = {
    categories: CategoryWithModelsType[]
    toggleModal: () => void
    isAuth: boolean
}

function Footer(props: PropsType) {
    const [activeSection, setActiveSection] = useState<string>('')
    const catalogDesc = props.categories.map((category) => {
        return (
            <Grid item xl={2} md={3} sm={4} xs={12} className={`${s.links} ${s.active}`} key={category.id} >
                <ul>
                    <li className={s.section_title}>{category.category}</li>
                    {category.models.map((model) => {
                        return (
                            <li key={model.id}>
                                <NavLink to={`/c/${category.slug}/?model=${model.slug}`}
                                         className={s.section_link}>{model.model}</NavLink>
                            </li>
                        )
                    })}
                </ul>
            </Grid>
        )
    })
    const catalogMobile = props.categories.map((category) => {
        return (
            <Grid item xl={2} md={3} sm={4} xs={12} className={`${s.links} ${activeSection === category.slug && s.active}`} key={category.id}>
                <div className={`${s.section_title__mobile} ${activeSection === category.slug && s.active}`} onClick={() => handleActiveSection(category.slug)}>{category.category}</div>
                <ul>
                    <li  className={s.section_title}>{category.category}</li>
                    {category.models.map((model) => {
                        return (
                            <li key={model.id}>
                                <NavLink to={`/c/${category.slug}/?model=${model.slug}`}
                                         className={s.section_link}>{model.model}</NavLink>
                            </li>
                        )
                    })}
                </ul>
            </Grid>
        )
    })

    const handleActiveSection = (section: string) => {
        setActiveSection(activeSection == section ? '' : section)
    }

    return (
        <div className={s.container}>
            {/*desc*/}
            <div className={s.wrapper_desc}>
                <Grid container className={s.footer_wrapper}>
                    {/*About*/}
                    <Grid item xl={2} md={3} sm={4} xs={12} className={`${s.links} ${s.active}`}>
                        <ul>
                            <li key='312' className={s.section_title}>Информация</li>
                            <li key='3123'>
                                <NavLink to='#' className={s.section_link}>Про магазин</NavLink>
                            </li>
                            <li key='31211'>
                                <NavLink to='#' className={s.section_link}>Условия продаж</NavLink>
                            </li>
                            <li key='312223'>
                                <NavLink to='#' className={s.section_link}>Гарантия</NavLink>
                            </li>
                        </ul>
                    </Grid>
                    {/*Catalog*/}
                    {catalogDesc}
                </Grid>
            </div>

            {/*mobile*/}
            <div className={s.wrapper_mobile}>
                <Grid container className={s.footer_wrapper}>
                    {/*About*/}

                    <Grid item xl={2} md={3} sm={4} xs={12} className={`${s.links} ${activeSection === 'info' && s.active}`}>
                        <div className={`${s.section_title__mobile} ${activeSection === 'info' && s.active}`} onClick={() => handleActiveSection('info')}>Информация</div>
                        <ul>
                            <li className={s.section_title}>Информация</li>
                            <li>
                                <NavLink to='#' className={s.section_link}>Про магазин</NavLink>
                            </li>
                            <li>
                                <NavLink to='#' className={s.section_link}>Условия продаж</NavLink>
                            </li>
                            <li>
                                <NavLink to='#' className={s.section_link}>Гарантия</NavLink>
                            </li>
                        </ul>
                    </Grid>
                    {/*Catalog*/}
                    {catalogMobile}
                </Grid>
            </div>


        </div>
    )
}

export default Footer