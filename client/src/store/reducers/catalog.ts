import {CatalogStateType} from "../../types/store/catalog-reducer-types";
import {LOAD_PRODUCTS_FAIL, LOAD_PRODUCTS_SUCCESS, TOGGLE_IS_LOADING} from "../actions/catalog";

const initialState: CatalogStateType = {
    catalog: {
        category: {
            id: 0,
            category: 'Catalog',
            slug: 'catalog-default-slug'
        },
        products: [],
        productCount: 0,
        currentPage: 0,
        pageSize: 12,
        filterValues: null,
    },
    error: null,
    isLoading: true
}

const catalogReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOAD_PRODUCTS_SUCCESS: {
            return {

                ...state, catalog: {...action.catalog}
            }
        }
        case LOAD_PRODUCTS_FAIL: {
            return {
                ...state, catalog: {
                    category: {
                        id: 0,
                        category: 'Catalog',
                        slug: 'catalog-default-slug'
                    },
                    products: [],
                    productCount: 0,
                    currentPage: 0,
                    pageSize: 12,
                    filterValues: null,
                }
            }
        }
        case TOGGLE_IS_LOADING: {
            const stateCopy = {
                ...state, isLoading: action.isLoading
            }
            return stateCopy
        }
        default:
            return state
    }
}

export default catalogReducer