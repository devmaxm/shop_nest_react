import {Grid} from "@mui/material";
import s from './Product.module.css'
import {useState} from "react";
import Description from "./Description";
import Properties from "./Properties";
import Reviews from "./Reviews/Reviews";
import {ProductFooterProps} from "../../types/product-types";

function ProductFooter(props: ProductFooterProps) {
    const [activeLink, setActiveLink] = useState('Описание')
    return (
        <>
            <Grid className='grey_bg'>
                <ul className={`${s.product_footer_header} container`}>
                    <li>
                        <p
                            className={`${s.footer_link} ${activeLink === "Описание" && s.active}`}
                            onClick={() => setActiveLink('Описание')}
                        >Описание</p>
                    </li>
                    <li>
                        <p
                            className={`${s.footer_link} ${activeLink === "Характеристики" && s.active}`}
                            onClick={() => setActiveLink('Характеристики')}
                        >Характеристики</p>
                    </li>
                    <li>
                        <p
                            className={`${s.footer_link} ${activeLink === "Отзывы" && s.active}`}
                            onClick={() => setActiveLink('Отзывы')}
                        >Отзывы</p>
                    </li>
                </ul>
            </Grid>
            <Grid className='container'>
                {activeLink === "Описание" && <Description description={props.description}/>}
                {activeLink === "Характеристики" && <Properties properties={props.properties}/>}
                {activeLink === "Отзывы" && <Reviews reviews={props.reviews}/>}
            </Grid>
        </>
    )
}

export default ProductFooter