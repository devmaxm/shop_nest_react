import {Box, Grid} from "@mui/material";
import s from '../MainPage.module.css'
import {Link} from "react-router-dom";

function Rubrics() {
    return (
        <div style={{marginTop: "50px"}}>
            {/*large*/}
            <div className={s.large_rubrics}>
                <Grid container className={s.wrapper}>
                    {/*iPhone*/}
                    <Grid item xs={3} className={s.rubric}>
                        <div className={`${s.rubric_wrapper} ${s.iphone_rubric}`}>
                            <h1 className={s.rubric_title}>iPhone</h1>
                            <Link to='/c/iphone' className={s.redirect_link}>
                                Просмотреть модели
                                <span className={s.redirect_link_icon}>›</span>
                            </Link>
                        </div>
                    </Grid>

                    <Grid container item xs={6}>
                        {/*mac*/}
                        <Grid item xs={12} className={s.rubric}>
                            <div className={`${s.rubric_wrapper} ${s.mac_rubric}`}>
                                <h1 className={s.rubric_title}>Mac Book</h1>
                                <Link to='/c/mac-book' className={s.redirect_link}>
                                    Просмотреть модели
                                    <span className={s.redirect_link_icon}>›</span>
                                </Link>
                            </div>
                        </Grid>
                        {/*apple watch*/}
                        <Grid container item xs={12}>
                            <Grid item xs={6} className={s.rubric}>
                                <div className={`${s.rubric_wrapper} ${s.apple_watch_rubric}`}>
                                    <h1 className={s.rubric_title}>Apple Watch</h1>
                                    <Link to='/c/apple-watch' className={s.redirect_link}>
                                        Просмотреть модели
                                        <span className={s.redirect_link_icon}>›</span>
                                    </Link>
                                </div>
                            </Grid>

                            {/*tv*/}
                            <Grid item xs={6} className={s.rubric}>
                                <div className={`${s.rubric_wrapper} ${s.tv_rubric}`}>
                                    <h1 className={s.rubric_title}>Apple TV</h1>
                                    <Link to='/c/apple-tv' className={s.redirect_link}>
                                        Просмотреть модели
                                        <span className={s.redirect_link_icon}>›</span>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={3}>
                        {/*iPad*/}
                        <Grid item xs={12} className={s.rubric}>
                            <div className={`${s.rubric_wrapper} ${s.ipad_rubric}`}>
                                <h1 className={s.rubric_title}>iPad</h1>
                                <Link to='/c/ipad' className={s.redirect_link}>
                                    Просмотреть модели
                                    <span className={s.redirect_link_icon}>›</span>
                                </Link>
                            </div>
                        </Grid>
                        {/*accessories*/}
                        <Grid item xs={12} className={s.rubric}>
                            <div className={`${s.rubric_wrapper} ${s.accessories_rubric}`}>
                                <h1 className={s.rubric_title}>Аксессуары</h1>
                                <Link to='/c/accessories' className={s.redirect_link}>
                                    Просмотреть модели
                                    <span className={s.redirect_link_icon}>›</span>
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            {/*/!*middle*!/*/}


            <div className={s.middle_rubrics}>
                <Grid container className={s.wrapper}>
                    {/*mac*/}
                    <Grid item xs={12} className={s.rubric}>
                        <div className={`${s.rubric_wrapper} ${s.mac_rubric} ${s.middle_r}`}>
                            <h1 className={s.rubric_title}>Mac Book</h1>
                            <Link to='/c/mac-book' className={s.redirect_link}>
                                Просмотреть модели
                                <span className={s.redirect_link_icon}>›</span>
                            </Link>
                        </div>
                    </Grid>

                    <Grid container item xs={12}>
                        {/*mac*/}
                        <Grid item xs={6} className={s.rubric}>
                            <div className={`${s.rubric_wrapper} ${s.iphone_rubric}`}>
                                <h1 className={s.rubric_title}>iPhone</h1>
                                <Link to='/c/iphone' className={s.redirect_link}>
                                    Просмотреть модели
                                    <span className={s.redirect_link_icon}>›</span>
                                </Link>
                            </div>
                        </Grid>
                        {/*apple watch*/}
                        <Grid container item xs={6}>
                            <Grid item xs={12} className={s.rubric}>
                                <div className={`${s.rubric_wrapper} ${s.apple_watch_rubric}`}>
                                    <h1 className={s.rubric_title}>Apple Watch</h1>
                                    <Link to='/c/apple-watch' className={s.redirect_link}>
                                        Просмотреть модели
                                        <span className={s.redirect_link_icon}>›</span>
                                    </Link>
                                </div>
                            </Grid>

                            {/*tv*/}
                            <Grid item xs={12} className={s.rubric}>
                                <div className={`${s.rubric_wrapper} ${s.tv_rubric}`}>
                                    <h1 className={s.rubric_title}>Apple TV</h1>
                                    <Link to='/c/apple-tv' className={s.redirect_link}>
                                        Просмотреть модели
                                        <span className={s.redirect_link_icon}>›</span>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12}>
                        {/*iPad*/}
                        <Grid item xs={6} className={s.rubric}>
                            <div className={`${s.rubric_wrapper} ${s.ipad_rubric} ${s.middle_r}`}>
                                <h1 className={s.rubric_title}>iPad</h1>
                                <Link to='/c/ipad' className={s.redirect_link}>
                                    Просмотреть модели
                                    <span className={s.redirect_link_icon}>›</span>
                                </Link>
                            </div>
                        </Grid>
                        {/*accessories*/}
                        <Grid item xs={6} className={s.rubric}>
                            <div className={`${s.rubric_wrapper} ${s.accessories_rubric} ${s.middle_r}`}>
                                <h1 className={s.rubric_title}>Аксессуары</h1>
                                <Link to='/c/accessories' className={s.redirect_link}>
                                    Просмотреть модели
                                    <span className={s.redirect_link_icon}>›</span>
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>


            {/*small*/}
            <div className={s.small_rubrics}>
                <Grid container className={`${s.wrapper} ${s.small_rubrics}`}>
                    {/*mac*/}
                    <Grid item xs={12} className={s.rubric}>
                        <div className={`${s.rubric_wrapper} ${s.mac_rubric} ${s.small_r}`}>
                            <h1 className={s.rubric_title}>Mac Book</h1>
                            <Link to='/c/mac-book' className={s.redirect_link}>
                                Просмотреть модели
                                <span className={s.redirect_link_icon}>›</span>
                            </Link>
                        </div>
                    </Grid>
            
                    <Grid item xs={12} className={s.rubric}>
                        <div className={`${s.rubric_wrapper} ${s.iphone_rubric} ${s.small_r}`}>
                            <h1 className={s.rubric_title}>iPhone</h1>
                            <Link to='/c/iphone' className={s.redirect_link}>
                                Просмотреть модели
                                <span className={s.redirect_link_icon}>›</span>
                            </Link>
                        </div>
                    </Grid>
                    {/*apple watch*/}
                    <Grid item xs={12} className={s.rubric}>
                        <div className={`${s.rubric_wrapper} ${s.apple_watch_rubric} ${s.small_r}`}>
                            <h1 className={s.rubric_title}>Apple Watch</h1>
                            <Link to='/c/apple-watch' className={s.redirect_link}>
                                Просмотреть модели
                                <span className={s.redirect_link_icon}>›</span>
                            </Link>
                        </div>
                    </Grid>
            
                    {/*tv*/}
                    <Grid item xs={12} className={s.rubric}>
                        <div className={`${s.rubric_wrapper} ${s.tv_rubric} ${s.small_r}`}>
                            <h1 className={s.rubric_title}>Apple TV</h1>
                            <Link to='/c/apple-tv' className={s.redirect_link}>
                                Просмотреть модели
                                <span className={s.redirect_link_icon}>›</span>
                            </Link>
                        </div>
                    </Grid>
            
                    {/*iPad*/}
                    <Grid item xs={12} className={s.rubric}>
                        <div className={`${s.rubric_wrapper} ${s.ipad_rubric} ${s.middle_r} ${s.small_r}`}>
                            <h1 className={s.rubric_title}>iPad</h1>
                            <Link to='/c/ipad' className={s.redirect_link}>
                                Просмотреть модели
                                <span className={s.redirect_link_icon}>›</span>
                            </Link>
                        </div>
                    </Grid>
                    {/*accessories*/}
                    <Grid item xs={12} className={s.rubric}>
                        <div className={`${s.rubric_wrapper} ${s.accessories_rubric} ${s.middle_r} ${s.small_r}`}>
                            <h1 className={s.rubric_title}>Аксессуары</h1>
                            <Link to='/c/accessories' className={s.redirect_link}>
                                Просмотреть модели
                                <span className={s.redirect_link_icon}>›</span>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Rubrics