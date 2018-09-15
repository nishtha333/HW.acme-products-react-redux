import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteProduct } from './store'

class Product extends Component {

    render() {

        const { products, match, deleteProduct } = this.props
        const product = products.find(product => product.id === Number(this.props.match.params.id))

        return (
            <div>
                {product.name} 
                <button onClick={() => deleteProduct(match.params.id)}>X</button>
            </div>
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
        deleteProduct: (id) => dispatch(deleteProduct(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product))