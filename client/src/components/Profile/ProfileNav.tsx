import {Grid} from "@mui/material";
import s from './Profile.module.css'
import {NavLink} from "react-router-dom";

type PropsType = {
    logout: () => void
}

function ProfileNav(props: PropsType) {
    return (
        <Grid item md={3} xs={12} className={s.nav_wrapper}>
            <ul className={s.link_list}>
                {/*<li>*/}
                {/*    <NavLink*/}
                {/*        to='home'*/}
                {/*        className={*/}
                {/*            ({isActive}) => (isActive && s.active) + ' ' + s.nav_link*/}
                {/*        }*/}
                {/*    >Профиль</NavLink>*/}
                {/*</li>*/}
                <li>
                    <NavLink
                        to='orders'
                        className={
                            ({isActive}) => (isActive && s.active) + ' ' + s.nav_link
                        }
                    >История заказов</NavLink>
                </li>
                <li>
                    <NavLink
                        to='favorite'
                        className={
                            ({isActive}) => (isActive && s.active) + ' ' + s.nav_link
                        }
                    >Список желаний</NavLink>
                </li>
                <li>
                    <NavLink
                        to='/cart'
                        className={
                            ({isActive}) => (isActive && s.active) + ' ' + s.nav_link
                        }
                    >Корзина</NavLink>
                </li>
                <li>
                    <button className={s.nav_link} onClick={props.logout}>Выйти</button>
                </li>
            </ul>
        </Grid>

    )
}

export default ProfileNav