import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

// Action Types
const GOT_PRODUCTS_FROM_SERVER = 'GOT_PRODUCTS_FROM_SERVER'
const DELETED_PRODUCT = 'DELETED_PRODUCT'
const CREATED_PRODUCT = 'CREATED_PRODUCT'
const UPDATE_TOP_RATED_PRODUCT = 'UPDATE_TOP_RATED_PRODUCT'
const ERROR_RECEIVED = 'ERROR_RECEIVED'

// Action Creators
export const getProducts = () => {
    return (dispatch) => {
        axios.get('/api/products')
            .then(response => response.data)
            .then(products => {
                console.log(products)
                dispatch(gotProductsFromServer(products))
            })
            .catch((error) => dispatch(errorReceived(error)))
    }
}

export const deleteProduct = (id) => {
    return (dispatch) => {
        axios.delete(`/api/products/${id}`)
            .then(() => dispatch(deletedProduct(id)))
            .catch((error) => dispatch(errorReceived(error)))
    }
}

export const createProduct = (product) => {
    return (dispatch) => {
        axios.post('/api/products', product)
            .then(response => response.data)
            .then(product => dispatch(createdProduct(product)))
            .catch((error) => dispatch(errorReceived(error)))
    }
}

const gotProductsFromServer = (products) => ({ type: GOT_PRODUCTS_FROM_SERVER, products})
const deletedProduct = (id) => ({ type: DELETED_PRODUCT, id})
const createdProduct = (product) => ({ type: CREATED_PRODUCT, product})
const updateTopRatedProduct = (products) => ({ type: UPDATE_TOP_RATED_PRODUCT, products})
const errorReceived = (error) => ({ type: ERROR_RECEIVED, error})

// Reducers
const productsReducer = (products = [], action) => {
    let result = products
    switch(action.type) {
        case GOT_PRODUCTS_FROM_SERVER:
            result = action.products
            store.dispatch(updateTopRatedProduct(result))
            break
        case DELETED_PRODUCT:
            result = products.filter(product => product.id !== action.id)
            store.dispatch(updateTopRatedProduct(result))
            break
        case CREATED_PRODUCT:
            result = [...products, action.product]
            store.dispatch(updateTopRatedProduct(result))
            break
    }
    return result
}

const topRatedProductReducer = (topRatedProduct = {}, action) => {
    switch(action.type) {
        case UPDATE_TOP_RATED_PRODUCT:
            const maxRating = Math.max(action.products.map(product => product.rating))
            return action.products.find(product => product.rating === maxRating)
        default:
            return topRatedProduct
    }
}

const store = createStore(combineReducers({
    products: productsReducer,
    topRatedProduct: topRatedProductReducer
    }, applyMiddleware(thunk, logger)))

export default store