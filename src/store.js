import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

// Action Types
const GOT_PRODUCTS_FROM_SERVER = 'GOT_PRODUCTS_FROM_SERVER'
const DELETED_PRODUCT = 'DELETED_PRODUCT'
const CREATED_PRODUCT = 'CREATED_PRODUCT'

// Action Creators
export const getProducts = () => {
    return (dispatch) => {
        axios.get('/api/products')
            .then(response => response.data)
            .then(products => dispatch(gotProductsFromServer(products)))
    }
}

export const deleteProduct = (id) => {
    return (dispatch) => {
        axios.delete(`/api/products/${id}`)
            .then(() => dispatch(deletedProduct(id)))
    }
}

export const createProduct = () => {
    return (dispatch) => {
        axios.post('/api/products')
            .then(response => response.data)
            .then(product => dispatch(createdProduct(product)))
    }
}

const gotProductsFromServer = (products) => ({ type: GOT_PRODUCTS_FROM_SERVER, products})
const deletedProduct = (id) => ({ type: DELETED_PRODUCT, id})
const createdProduct = (product) => ({ type: CREATED_PRODUCT, product})

// Reducers
const reducer = (state = {products: [], topRatedProduct: {} }, action) => {
    let updatedProducts = state.products
    let updatedTopRatedProduct = state.topRatedProduct
    switch(action.type) {
        case GOT_PRODUCTS_FROM_SERVER:
            updatedProducts = action.products
            break
        case DELETED_PRODUCT:
            updatedProducts = state.products.filter(product => product.id !== action.id)
            break
        case CREATED_PRODUCT:
            updatedProducts = [...state.products, action.product]
            break
    }
    if(updatedProducts.length > 0) {
        const maxRating = Math.max(...updatedProducts.map(product => product.rating))
        updatedTopRatedProduct = updatedProducts.find(product => product.rating === maxRating)
    }
    return {...state,
        products: updatedProducts,
        topRatedProduct: updatedTopRatedProduct
    }
}

const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store