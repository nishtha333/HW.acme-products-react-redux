import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { createProduct, deleteProduct } from './store'

class ProductsList extends Component {

    render() {
        const { products, deleteProduct, createProduct } = this.props

        return (
            <Fragment>
                <button onClick={() => createProduct()}>Create Product</button>
                <ul>
                {
                    products.map(product => <li key={product.id}>
                        { product.name }  { product.rating } 
                        <button onClick={() => deleteProduct(product.id)}>X</button>
                    </li>
                    )
                }
                </ul>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteProduct: (id) => dispatch(deleteProduct(id)),
        createProduct: () => dispatch(createProduct())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)