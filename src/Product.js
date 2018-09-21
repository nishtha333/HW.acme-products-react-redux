import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteProduct } from './store'

class Product extends Component {

    render() {
        const { product, deleteProduct } = this.props
        if(!product) {
            return null
        }

        return (
            <div>
                {product.name} 
                <button onClick={() => deleteProduct(product.id)}>X</button>
            </div>
        )
    }
}

/*Second parameter has props that are sent to component (other than by store)
Use them here and have all logic in map function */
const mapStateToProps = ({ products }, { match }) => {
    const id = match.params.id
    return {
        product: products.find(product => product.id === Number(id))
    }
}

const mapDispatchToProps = (dispatch, { history }) => {

    return {
        deleteProduct: (id) => dispatch(deleteProduct(id, history))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product))