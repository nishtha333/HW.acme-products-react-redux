import React, {Component} from 'react'
import { Link } from 'react-router-dom'
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
                <li>
                    <Link to="/products">Products ({products.length})</Link>
                </li>
                <li>
                    <Link to={`/products/${topRatedProduct.id}`}>Top Rated ({topRatedProduct.name})</Link>
                </li>
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