import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import axios from "axios";
import {PropertyType} from "../../types/product-types";
import {ThunkType} from "../../types/store/store";

export const LOAD_PRODUCT_SUCCESS = "LOAD_PRODUCT_SUCCESS"
export const CREATE_REVIEW_SUCCESS = "CREAT_REVIEW_SUCCESS"
export const SET_REQUIRED_FIELDS = "SET_REQUIRED_FIELDS"
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS"

export const LOAD_COLORS_SUCCESS = "LOAD_COLORS_SUCCESS"
export const ADD_COLOR_SUCCESS = "ADD_COLOR_SUCCESS"
export const DELETE_COLOR_SUCCESS = "DELETE_COLOR_SUCCESS"

export const LOAD_CATEGORIES_SUCCESS = "LOAD_CATEGORIES_SUCCESS"
export const ADD_CATEGORIES_SUCCESS = "ADD_CATEGORIES_SUCCESS"
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS"

export const LOAD_PROPERTIES_SUCCESS = "LOAD_PROPERTIES_SUCCESS"
export const ADD_PROPERTY_SUCCESS = "ADD_PROPERTY_SUCCESS"
export const DELETE_PROPERTY_SUCCESS = "DELETE_PROPERTY_SUCCESS"

export const LOAD_BRANDS_SUCCESS = "LOAD_BRANDS_SUCCESS"
export const ADD_BRANDS_SUCCESS = "ADD_BRANDS_SUCCESS"
export const DELETE_BRAND_SUCCESS = "DELETE_BRAND_SUCCESS"

export const LOAD_MODELS_SUCCESS = "LOAD_MODELS_SUCCESS"
export const ADD_MODEL_SUCCESS = "ADD_MODEL_SUCCESS"
export const DELETE_MODEL_SUCCESS = "DELETE_MODEL_SUCCESS"

export const LOAD_QUESTIONS_SUCCESS = "LOAD_QUESTIONS_SUCCESS"
export const DELETE_QUESTION_SUCCESS = "DELETE_QUESTION_SUCCESS"

export const LOAD_ORDERS_SUCCESS = "LOAD_ORDERS_SUCCESS"

export const TOGGLE_MODAL = "TOGGLE_MODAL"

//Products
export const loadProducts = (): ThunkType => async dispatch => {
    try {
        const config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/product`, config)
        dispatch({type: LOAD_PRODUCT_SUCCESS, products: response.data.products})
    } catch (e) {
        console.log(e)
    }
}
export const setRequiredFields = (modelId: number): ThunkType => async dispatch => {
    try {
        const config = {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/product/fields/${modelId}`, config)
        dispatch({
            type: SET_REQUIRED_FIELDS,
            category: response.data.category,
            brand: response.data.brand,
            requiredFields: response.data.requiredFields
        })
    } catch (e) {

    }
}
export const addProduct = (
    title: string, description: string,
    priceUAN: string, sale: string, colorId: string, availableQuantity: string, mainPhoto: File, otherPhotos: FileList,
    modelId: string, properties: PropertyType[], categoryId: string, brandId: string, slug: string, code: string
): ThunkType => async dispatch => {
    try {
        const config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
            }
        }
        const formData = new FormData()
        formData.append('title', title)
        formData.append('code', code)
        formData.append('description', description)
        formData.append('priceUAN', priceUAN)
        formData.append('sale', sale)
        formData.append('colorId', colorId)
        formData.append('availableQuantity', availableQuantity)
        formData.append('mainPhoto', mainPhoto)
        for (let i = 0; i < otherPhotos.length; i++) {
            formData.append('otherPhotos', otherPhotos[i])
        }
        formData.append('modelId', modelId)
        formData.append('properties', JSON.stringify(properties))
        formData.append('categoryId', categoryId)
        formData.append('brandId', brandId)
        formData.append('slug', slug)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/product`, formData, config)
    } catch (e) {
        console.log(e)
    }
}
export const deleteProduct = (productId: number): ThunkType => async dispatch => {
    try {
        const config = {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/admin/product/${productId}`, config)
        console.log(response)
        dispatch({type: DELETE_PRODUCT_SUCCESS, productsId: productId})
    } catch (e) {
        console.log(e)
    }
}
export const createReview = (productId: number, username:string, review: string, rating: number | null, createdAt: string): ThunkType => async dispatch => {
    try {
        const config = {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        const data = {productId, review, rating, createdAt, username}
        await axios.post(`${process.env.REACT_APP_API_URL}/admin/product/reviews`, data, config)
    } catch (e) {
        console.log(e)
    }
}
//Color
export const loadColors = (): ThunkType => async dispatch => {
    try {
        const config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/color`, config)
        dispatch({type: LOAD_COLORS_SUCCESS, colors: response.data.colors})
    } catch (e) {
        console.log(e)
    }
}
export const addColor = (color: string, hex: string, slug: string): ThunkType => async dispatch => {
    try {
        const config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        const data = {color, hex, slug}
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/color`, data, config)
        dispatch({type: ADD_COLOR_SUCCESS, color: response.data.color})
    } catch (e) {
        console.log(e)
    }
}
export const deleteColor = (id: number): ThunkType => async dispatch => {
    try {
        const config = {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        await axios.delete(`${process.env.REACT_APP_API_URL}/admin/color/${id}`, config)
        dispatch({type: DELETE_COLOR_SUCCESS, id})
    } catch (e) {
        console.log(e)
    }
}
//Categories
export const loadCategories = (): ThunkType => async dispatch => {
    try {
        const config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/category`, config)
        dispatch({type: LOAD_CATEGORIES_SUCCESS, categories: response.data.categories})
    } catch (e) {
        console.log(e)
    }
}
export const addCategory = (category: string, slug: string, requiredProperties: number[]): ThunkType => async dispatch => {
    try {
        const config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        const data = {category, requiredProperties, slug}
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/category`, data, config)
        dispatch({type: ADD_CATEGORIES_SUCCESS, category: response.data.category})
    } catch (e) {
        console.log(e)
    }
}
export const deleteCategory = (id: number): ThunkType => async dispatch => {
    try {
        const config = {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        await axios.delete(`${process.env.REACT_APP_API_URL}/admin/category/${id}`, config)
        dispatch({type: DELETE_CATEGORY_SUCCESS, id})
    } catch (e) {
        console.log(e)
    }
}
//Properties
export const addProperty = (property: string, slug: string): ThunkType => async dispatch => {
    try {
        const config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        const data = {property, slug}
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/required-property`, data, config)
        dispatch({type: ADD_PROPERTY_SUCCESS, property: response.data.property})
    } catch (e) {
        console.log(e)
    }
}
export const loadProperties = (): ThunkType => async dispatch => {
    try {
        const config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/required-property`, config)
        dispatch({type: LOAD_PROPERTIES_SUCCESS, properties: response.data.properties})
    } catch (e) {
        console.log(e)
    }
}
export const deleteProperty = (id: number): ThunkType => async dispatch => {
    try {
        const config = {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        await axios.delete(`${process.env.REACT_APP_API_URL}/admin/required-property/${id}`, config)
        dispatch({type: DELETE_PROPERTY_SUCCESS, id})
    } catch (e) {
        console.log(e)
    }
}
//Brand
export const loadBrands = (): ThunkType => async dispatch => {
    try {
        const config = {
            headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}
        }
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/brand`, config)
        dispatch({type: LOAD_BRANDS_SUCCESS, brands: response.data.brands})
    } catch (e) {
        console.log(e)
    }
}
export const addBrand = (brand: string, description: string, slug: string): ThunkType => async dispatch => {
    try {
        const config = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }
        const data = {brand, description, slug}
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/brand`, data, config)
        dispatch({type: ADD_BRANDS_SUCCESS, brand: response.data.brand})
    } catch (e) {
        console.log(e)
    }
}
export const deleteBrand = (id: number): ThunkType => async dispatch => {
    try {
        const config = {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        await axios.delete(`${process.env.REACT_APP_API_URL}/admin/brand/${id}`, config)
        dispatch({type: DELETE_BRAND_SUCCESS, id})
    } catch (e) {
        console.log(e)
    }
}
//Model
export const loadModels = (): ThunkType => async dispatch => {
    try {
        const config = {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/model`, config)
        dispatch({type: LOAD_MODELS_SUCCESS, models: response.data.models})
    } catch (e) {
        console.log(e)
    }
}
export const addModel = (model: string, brandId: number, categoryId: number, slug: string): ThunkType => async dispatch => {
    try {
        const config = {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        const data = {model, brandId, categoryId, slug}
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/model`, data, config)
        console.log(response.data.model)
        dispatch({type: ADD_MODEL_SUCCESS, model: response.data.model})
    } catch (e) {
        console.log(e)
    }
}
export const deleteModel = (id: number): ThunkType => async dispatch => {
    try {
        const config = {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        await axios.delete(`${process.env.REACT_APP_API_URL}/admin/model/${id}`, config)
        dispatch({type: DELETE_MODEL_SUCCESS, id})
    } catch (e) {
        console.log(e)
    }
}
//questions
export const loadQuestions = (): ThunkType => async dispatch => {
    try {
        const config = {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/question`, config)
        dispatch({type: LOAD_QUESTIONS_SUCCESS, questions: response.data.questions})
    } catch (e) {
        console.log(e)
    }
}
export const deleteQuestion = (id: number): ThunkType => async dispatch => {
    try {
        const config = {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        await axios.delete(`${process.env.REACT_APP_API_URL}/admin/question/${id}`, config)
        dispatch({type: DELETE_QUESTION_SUCCESS, questionId: id})
    } catch (e) {
        console.log(e)
    }
}
//orders
export const loadOrders = (): ThunkType => async dispatch => {
    try {
        const config = {headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`}}
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/orders`, config)
        dispatch({type: LOAD_ORDERS_SUCCESS, orders: response.data.orders})
    } catch (e) {
        console.log(e)
    }
}

//modal
export const toggleModal = (modalType?: string, id?: number) => {
    return {type: TOGGLE_MODAL, modalType, id}
}
