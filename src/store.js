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

export const deleteProduct = (id, history) => {
    return (dispatch) => {
        axios.delete(`/api/products/${id}`)
            .then(response => response.data)   //Wait for response before sending deletedProduct message  and pushing to history
            .then(() => dispatch(deletedProduct(id)))
            .then(() => history && history.push('/products'))
    }
}

export const createProduct = () => {
    return (dispatch) => {
        axios.post('/api/products')
            .then(response => response.data)
            .then(product => dispatch(createdProduct(product)))
    }
}

/* Prof's notes: begin these with "_" and thunks have same name without "_" */
const gotProductsFromServer = (products) => ({ type: GOT_PRODUCTS_FROM_SERVER, products})
const deletedProduct = (id) => ({ type: DELETED_PRODUCT, id})
const createdProduct = (product) => ({ type: CREATED_PRODUCT, product})

// Reducers
/* Prof's Notes - See solution 
Separate reducer for products then use combineReducers and define products in there - saves lot of notation
For topRatedProduct - no need to store the state; it is derived and selector can be used for it: 
   sort the products by desc using built-in function desc */
const reducer = (state = { products: [] }, action) => {
    let updatedProducts = state.products
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
    return {...state,
        products: updatedProducts
    }
}

export const topRatedProduct = ( products ) => products.reduce((result, input) => {
    if(result === undefined || input.rating > result.rating) {
        result = input
    }
    return result
}, undefined)

const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store