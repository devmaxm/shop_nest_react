import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

//store
import {connect} from "react-redux";
import {StoreType} from "./types/store/store";
import {checkAuth} from "./store/actions/auth";
import {loadCart} from "./store/actions/cart";

//auth components
import AuthContainer from "./components/Auth/AuthContainer";
import LoginContainer from "./components/Auth/Login/LoginContainer";
import ContainerRegister from "./components/Auth/Register/ContainerRegister";

//admin components
import ContainerAdmin from "./components/Admin/ContainerAdmin";

import ContainerAdminProduct from "./components/Admin/AdminProduct/ContainerAdminProduct";
import AdminProductList from "./components/Admin/AdminProduct/AdminProductList";
import AdminProductForm from "./components/Admin/AdminProduct/AdminProductForm";

import ContainerAdminColor from "./components/Admin/AdminColor/ContainerAdminColor";
import AdminColorList from "./components/Admin/AdminColor/AdminColorList";
import AdminColorForm from "./components/Admin/AdminColor/AdminColorForm";

import ContainerAdminCategories from "./components/Admin/AdminCategories/ContainerAdminCategories";
import AdminCategoriesList from "./components/Admin/AdminCategories/AdminCategoriesList";
import AdminCategoriesForm from "./components/Admin/AdminCategories/AdminCategoriesForm";

import ContainerAdminProperties from "./components/Admin/AdminProperties/ContainerAdminProperties";
import AdminPropertiesList from "./components/Admin/AdminProperties/AdminPropertiesList";
import AdminPropertiesForm from "./components/Admin/AdminProperties/AdminPropertiesForm";

import ContainerAdminBrand from "./components/Admin/AdminBrand/ContainerAdminBrand";
import AdminBrandList from "./components/Admin/AdminBrand/AdminBrandList";
import AdminBrandForm from "./components/Admin/AdminBrand/AdminBrandForm";

import ContainerAdminModels from "./components/Admin/AdminModels/ConteinerAdminModels";
import AdminModelsList from "./components/Admin/AdminModels/AdminModelsList";
import AdminModelsForm from "./components/Admin/AdminModels/AdminModelsForm";

import AdminProductReviews from "./components/Admin/AdminProduct/AdminProductReviews";
import ContainerAdminQuestions from "./components/Admin/AdminQuestions/ContainerAdminQuestions";
import ContainerAdminOrder from "./components/Admin/AdminOrders/ContainerAdminOrder";


//main components
import ContainerMainPage from "./components/MainPage/ContainerMainPage";
import ProductContainer from "./components/Product/ProductContainer";
import ContainerCatalog from "./components/Catalog/ContainerCatalog";
import NavContainer from "./components/Nav/NavContainer";
import FooterContainer from "./components/Footer/FooterContainer";
//cart components
import CartContainer from "./components/Cart/CartContainer";
import CartDetail from "./components/Cart/CartDetail/CartDetail";
import Order from "./components/Cart/Order/Order";
import ProfileContainer from "./components/Profile/ProfileContainer";
import ProfileMain from "./components/Profile/ProfileMain";
import ProfileFavorite from "./components/Profile/ProfileFavorite";
import OnlyAuthComponent from "./HOC/OnlyAuthComponent";
import ProfileOrders from "./components/Profile/Orders/ProfileOrders";

type PropsType = {
    isAuth: boolean,
    loadCart: () => void
}

function App(props: PropsType) {
    useEffect(() => {
        props.loadCart()
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <NavContainer />
                <Routes>
                    <Route path={'auth'} element={<AuthContainer/>}>
                        <Route path={'login'} element={<LoginContainer/>}/>
                        <Route path={'register'} element={<ContainerRegister/>}/>
                    </Route>
                    <Route path={'admin/*'} element={<ContainerAdmin/>}>
                        <Route path='products' element={<ContainerAdminProduct/>}>
                            <Route path='' element={<AdminProductList/>}/>
                            <Route path='add' element={<AdminProductForm isEdit={false}/>}/>
                            <Route path='reviews/:productId' element={<AdminProductReviews />}/>
                        </Route>
                        <Route path='colors' element={<ContainerAdminColor/>}>
                            <Route path='' element={<AdminColorList/>}/>
                            <Route path='add' element={<AdminColorForm isEdit={false}/>}/>
                        </Route>
                        <Route path='categories' element={<ContainerAdminCategories/>}>
                            <Route path='' element={<AdminCategoriesList/>}/>
                            <Route path='add' element={<AdminCategoriesForm isEdit={false}/>}/>
                            <Route path='edit/:id' element={<AdminCategoriesForm isEdit={true}/>}/>
                        </Route>
                        <Route path='properties' element={<ContainerAdminProperties/>}>
                            <Route path='' element={<AdminPropertiesList/>}/>
                            <Route path='add' element={<AdminPropertiesForm isEdit={false}/>}/>
                            <Route path='edit/:id' element={<AdminPropertiesForm isEdit={true}/>}/>
                        </Route>
                        <Route path='brand' element={<ContainerAdminBrand/>}>
                            <Route path='' element={<AdminBrandList/>}/>
                            <Route path='add' element={<AdminBrandForm isEdit={false}/>}/>
                            <Route path='edit/:id' element={<AdminBrandForm isEdit={true}/>}/>
                        </Route>
                        <Route path='models' element={<ContainerAdminModels/>}>
                            <Route path='' element={<AdminModelsList/>}/>
                            <Route path='add' element={<AdminModelsForm isEdit={false}/>}/>
                            <Route path='edit/:id' element={<AdminModelsForm isEdit={true}/>}/>
                        </Route>

                        <Route path='questions' element={<ContainerAdminQuestions/>}></Route>
                        <Route path='orders' element={<ContainerAdminOrder />} />
                    </Route>

                    <Route path='cart' element={<CartContainer />}>
                        <Route path='' element={<CartDetail />} />
                        <Route path='order' element={<Order />} />
                    </Route>
                    <Route path='profile' element={<OnlyAuthComponent isAuth={props.isAuth} children={<ProfileContainer />} />}>
                        <Route path='home' element={<ProfileMain />}/>
                        <Route path='favorite' element={<ProfileFavorite />}/>
                        <Route path='orders' element={<ProfileOrders />}/>
                    </Route>
                    <Route path='p/:productSlug' element={<ProductContainer/>}/>
                    <Route path='c/' element={<ContainerCatalog/>}/>
                    <Route path='c/:category' element={<ContainerCatalog/>}/>
                    <Route path='' element={<ContainerMainPage/>}/>

                </Routes>
                <FooterContainer />
            </BrowserRouter>

        </div>
    );
}

const mapStateToProps = (state: StoreType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {checkAuth, loadCart})(App);
