import React, {Component} from 'react'
import { connect } from 'react-redux'
import { getProducts } from './store'

class Nav extends Component {

    componentDidMount() {
        this.props.getProducts()
    }

    render () {
        const { products, topRatedProduct } = this.props
        return (
            <ul>
                <li>Products ({products.length})</li>
                <li>Top Rated ({topRatedProduct.name})</li>
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        topRatedProduct: state.topRatedProduct
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(getProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)