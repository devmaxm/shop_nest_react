import s from '../MainPage.module.css'
import {Box, Grid} from "@mui/material";
import {Link} from "react-router-dom";

function Goods() {
    return (
        <div className={s.goods_container}>
            <Grid container className={s.wrapper} sx={{padding: 0}}>
                <Grid item md={4} sm={6} xs={12} className={s.good_item_wrapper}>
                    <div className={s.good_card}>
                        <img className={s.good_img} src={require('../../../assets/main_page_goods/good-air-pods.png')} />
                        <div className={s.good_info}>
                            <h1 className={s.good_title}>AirPods</h1>
                            <p className={s.good_description}>Никаких проводов, никаких проблем. Йопта</p>
                            <Link to='/c/air-pods' className={s.redirect_link}>
                                Купить
                                <span className={s.redirect_link_icon}>›</span>
                            </Link>
                        </div>
                    </div>
                </Grid>
                <Grid item md={4} sm={6} xs={12} className={s.good_item_wrapper}>
                    <div className={s.good_card}>
                        <img className={s.good_img} src={require('../../../assets/main_page_goods/good-case.png')} />
                        <div className={s.good_info}>
                            <h1 className={s.good_title}>Чехлы на iPhone</h1>
                            <p className={s.good_description}>Только идеальные пары. Йопта</p>
                            <Link to='/c/accessories' className={s.redirect_link}>
                                Купить
                                <span className={s.redirect_link_icon}>›</span>
                            </Link>
                        </div>
                    </div>
                </Grid>
                <Grid item md={4} xs={12} className={s.good_item_wrapper}>
                    <div className={s.good_card}>
                        <img className={s.good_img} src={require('../../../assets/main_page_goods/good-watch.png')} />
                        <div className={s.good_info}>
                            <h1 className={s.good_title}>Apple Watch</h1>
                            <p className={s.good_description}>Технологии с будущего вам на пользу</p>
                            <Link to='/c/apple-watch' className={s.redirect_link}>
                                Купить
                                <span className={s.redirect_link_icon}>›</span>
                            </Link>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Goods