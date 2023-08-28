import {
    LOAD_PRODUCT_SUCCESS,
    LOAD_COLORS_SUCCESS,
    ADD_COLOR_SUCCESS,
    LOAD_CATEGORIES_SUCCESS,
    ADD_CATEGORIES_SUCCESS,
    LOAD_PROPERTIES_SUCCESS,
    ADD_PROPERTY_SUCCESS,
    LOAD_BRANDS_SUCCESS,
    ADD_BRANDS_SUCCESS,
    LOAD_MODELS_SUCCESS,
    ADD_MODEL_SUCCESS,
    SET_REQUIRED_FIELDS,
    DELETE_PRODUCT_SUCCESS,
    LOAD_QUESTIONS_SUCCESS,
    DELETE_QUESTION_SUCCESS,
    TOGGLE_MODAL,
    DELETE_MODEL_SUCCESS,
    DELETE_BRAND_SUCCESS,
    DELETE_PROPERTY_SUCCESS,
    DELETE_CATEGORY_SUCCESS,
    DELETE_COLOR_SUCCESS, LOAD_ORDERS_SUCCESS
} from "../actions/admin";
import {AdminStateType} from "../../types/store/admin-reducer-types";


let adminInitialState: AdminStateType = {
    product: {
        products: [],
        create: {
            requiredFields: null,
            brand: null,
            category: null
        },
    },
    color: {
        colors: [],
    },
    category: {
        categories: []
    },
    property: {
        properties: []
    },
    brand: {
        brands: []
    },
    model: {
        models: []
    },
    question: {
        questions: []
    },
    order: {
        orders: []
    },
    deleteModal: {
        isActive: false,
        type: '',
        id: 0
    }
}

const adminReducer = (state = adminInitialState, action: any): AdminStateType => {
    switch (action.type) {
        // product
        case LOAD_PRODUCT_SUCCESS: {
            const stateCopy = {
                ...state,
                product: {...state.product}
            }
            stateCopy.product.products = action.products
            return stateCopy
        }
        case SET_REQUIRED_FIELDS: {
            const stateCopy = {
                ...state, product: {...state.product, create: {...state.product.create}}
            }
            stateCopy.product.create.requiredFields = action.requiredFields
            stateCopy.product.create.brand = action.brand
            stateCopy.product.create.category = action.category
            return stateCopy
        }
        case DELETE_PRODUCT_SUCCESS: {
            return {
                ...state,
                product: {
                    ...state.product,
                    products: [...state.product.products].filter((p) => p.id !== action.id)
                }
            }
        }
        // color
        case LOAD_COLORS_SUCCESS: {
            const stateCopy = {
                ...state, color: {...state.color}
            }
            stateCopy.color.colors = action.colors
            return stateCopy
        }
        case ADD_COLOR_SUCCESS: {
            const stateCopy = {
                ...state,
                color: {...state.color, colors: [...state.color.colors, action.color], colorValue: '', hexValue: ''}
            }
            return stateCopy
        }
        case DELETE_COLOR_SUCCESS: {
            return {
                ...state,
                color: {
                    ...state.color,
                    colors: [...state.color.colors].filter((c) => c.id !== action.id)
                }
            }
        }
        // categories
        case LOAD_CATEGORIES_SUCCESS: {
            const stateCopy = {
                ...state, category: {...state.category}
            }
            stateCopy.category.categories = action.categories
            return stateCopy
        }
        case ADD_CATEGORIES_SUCCESS: {
            const stateCopy = {
                ...state,
                category: {...state.category, categories: [...state.category.categories, action.category]}
            }
            return stateCopy
        }
        case DELETE_CATEGORY_SUCCESS: {
            console.log('category')
            return {
                ...state,
                category: {
                    ...state.category,
                    categories: [...state.category.categories].filter((c) => c.id !== action.id)
                }
            }
        }
        // properties
        case LOAD_PROPERTIES_SUCCESS: {
            const stateCopy = {
                ...state, property: {...state.property}
            }
            stateCopy.property.properties = action.properties
            return stateCopy
        }
        case ADD_PROPERTY_SUCCESS: {
            const stateCopy = {
                ...state,
                property: {...state.property, properties: [...state.property.properties, action.property]}
            }
            return stateCopy
        }
        case DELETE_PROPERTY_SUCCESS: {
            return {
                ...state,
                property: {
                    ...state.property,
                    properties: [...state.property.properties].filter((p) => p.id !== action.id)
                }
            }
        }
        // brand
        case LOAD_BRANDS_SUCCESS: {
            const stateCopy = {
                ...state, brand: {...state.brand}
            }
            stateCopy.brand.brands = action.brands
            return stateCopy
        }
        case ADD_BRANDS_SUCCESS: {
            const stateCopy = {
                ...state,
                brand: {...state.brand, brands: [...state.brand.brands, action.brand]}
            }
            return stateCopy
        }
        case DELETE_BRAND_SUCCESS: {
            return {
                ...state,
                brand: {
                    ...state.brand,
                    brands: [...state.brand.brands].filter((b) => b.id !== action.id)
                }
            }
        }
        // model
        case LOAD_MODELS_SUCCESS: {
            const stateCopy = {
                ...state, model: {...state.model}
            }
            stateCopy.model.models = action.models
            return stateCopy
        }
        case ADD_MODEL_SUCCESS: {
            const stateCopy = {
                ...state,
                model: {...state.model, models: [...state.model.models, action.model]}
            }
            return stateCopy
        }
        case DELETE_MODEL_SUCCESS: {
            return {
                ...state,
                model: {
                    ...state.model,
                    models: [...state.model.models].filter((m) => m.id !== action.id)
                }
            }
        }
        // question
        case LOAD_QUESTIONS_SUCCESS: {
            return {
                ...state, question: {...state.question, questions: action.questions}
            }
        }
        case DELETE_QUESTION_SUCCESS: {
            return {
                ...state,
                question: {
                    ...state.question,
                    questions: [...state.question.questions].filter((q) => q.id !== action.questionId)
                }
            }
        }
        // orders
        case LOAD_ORDERS_SUCCESS: {
            console.log(action.orders)
            return {
                ...state, order: {...state.order, orders: action.orders}
            }
        }
        // modal
        case TOGGLE_MODAL: {
            const stateCopy = {
                ...state, deleteModal: {...state.deleteModal}
            }
            // debugger
            stateCopy.deleteModal.isActive = stateCopy.deleteModal.isActive ? false : true
            stateCopy.deleteModal.type = action.modalType && action.modalType
            stateCopy.deleteModal.id = action.id && action.id
            return stateCopy
        }

        default:
            return state
    }

}

export default adminReducer