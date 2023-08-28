//styles
import s from "./Nav.module.css";

//components
import {Link, NavLink} from "react-router-dom";
import {Grid} from "@mui/material";

//icons
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

//types
import {CategoryWithModelsType, ModelType} from "../../types/product-types";

//state
import {useState} from "react";
import CartModal from "./CartModal/CartModal";
import {CartType} from "../../types/cart-types";
import Search from "./Search";


export type PropsType = {
    categories: CategoryWithModelsType[] | []
    cart: CartType
    isAuth: boolean

    deleteItem: (productId: number) => void
    toggleModal: () => void

    isSearchActive: boolean
    toggleSearch: () => void
}


function Nav(props: PropsType) {
    const [currentMenuItem, setCurrentMenuItem] = useState<number | null>(null)
    const [activeModal, setActiveModal] = useState<boolean>(false)

    const categories = props.categories.map((category: CategoryWithModelsType) => {
        return (
            <li key={category.id} className={`${s.navbar_list__item}`}
                onMouseEnter={() => setCurrentMenuItem(category.id)}
                onMouseLeave={() => setCurrentMenuItem(null)}>
                <NavLink key={category.id} to={`c/${category.slug}`} className={s.navbar_link}>
                    {category.category}
                </NavLink>
                <ul className={`${s.model_links} ${currentMenuItem === category.id && s.active}`}>
                    {category.models.map((model) => {
                        return (
                            <li key={model.id}>
                                <Link to={`c/${category.slug}/?model=${model.slug}`} className={s.model_link}>
                                    {model.model}
                                </Link>
                            </li>
                        )
                    })}

                </ul>
            </li>
        )
    })

    const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false)
    const toggleMenu = () => {
        setIsActiveMenu(isActiveMenu ? false : true)
    }


    return (
        <nav className={s.navbar}>
            <Grid className={s.mobile_menu__wrapper}>
                <ul className={`${s.mobile_menu__list} ${isActiveMenu && s.active}`}>
                    <li className={s.mobile_menu__list__item}>
                        <Link to='/' className={s.mobile_menu__link} onClick={toggleMenu}>Главная</Link>
                    </li>
                    {props.categories.map((category) => {
                        return <li key={category.id} className={s.mobile_menu__list__item}>
                            <Link to={`c/${category.slug}`} className={s.mobile_menu__link}
                                  onClick={toggleMenu}>{category.category}</Link>
                        </li>
                    })}

                </ul>
            </Grid>



            <Grid container className={s.navbar_wrapper}>
                {/*left items*/}
                <Grid item className={s.navbar_brand}>
                    <ul className={s.navbar_list}>
                        <li className={`${s.navbar_list__item} ${s.navbar_main_links}`}>
                            <NavLink to='/' className={s.navbar_link}>
                                Главная
                            </NavLink>
                        </li>
                        <li
                            className={`${s.navbar_icon} ${s.mobile_menu}`}
                            onClick={toggleMenu}
                        >
                            {isActiveMenu ? <CloseIcon viewBox='2 2 20 20'/> : <MenuIcon viewBox='2 2 20 20'/>}
                        </li>
                        <li className={s.navbar_icon} onClick={props.toggleSearch}>
                            <SearchOutlinedIcon viewBox='2 2 20 20'/>
                        </li>
                    </ul>
                </Grid>

                <Grid item className={s.navbar_main_links}>
                    <ul className={s.navbar_list}>
                        {categories}
                    </ul>
                </Grid>

                <Grid item>
                    <ul className={s.navbar_list}>
                        <li
                            className={`${s.navbar_icon} ${s.cart_icon}`}
                            onMouseEnter={() => setActiveModal(true)}
                            onMouseLeave={() => setActiveModal(false)}
                        >
                            <NavLink to='cart' className={`${s.navbar_icon} ${s.cart_icon}`}>
                                <ShoppingCartOutlinedIcon viewBox='2 2 20 20' height='20px' width='20px'/>
                                {props.cart.items.length > 0 &&
                                    <span className={s.cart_amount}>{props.cart.items.length}</span>}
                            </NavLink>
                            <CartModal cart={props.cart} deleteItem={props.deleteItem} isActive={activeModal}/>
                        </li>
                        <li className={s.navbar_icon}>
                            {props.isAuth ?
                                <NavLink to='/profile/favorite' className={s.navbar_icon}>
                                    <FavoriteBorderOutlinedIcon viewBox='2 2 20 20' height='20px' width='20px'/>
                                </NavLink>
                                :
                                <button className={s.navbar_icon} onClick={props.toggleModal}>
                                    <FavoriteBorderOutlinedIcon viewBox='2 2 20 20' height='20px' width='20px'/>
                                </button>
                            }

                        </li>
                        <li className={s.navbar_icon}>
                            {props.isAuth ?
                                <NavLink to='/profile' className={s.navbar_icon}>
                                    <PersonOutlineOutlinedIcon viewBox='2 2 20 20' height='20px' width='20px'/>
                                </NavLink>
                                :
                                <button className={s.navbar_icon} onClick={props.toggleModal}>
                                    <PersonOutlineOutlinedIcon viewBox='2 2 20 20' height='20px' width='20px'/>
                                </button>
                            }
                        </li>
                    </ul>
                </Grid>
            </Grid>
            <Search isActive={props.isSearchActive} toggleSearch={props.toggleSearch} />
        </nav>
    )
}

export default Nav