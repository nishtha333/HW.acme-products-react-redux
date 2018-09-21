import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { topRatedProduct } from './store'

class Nav extends Component {

    render () {
        const { products, topRatedProduct } = this.props

        return (
            <ul>
                <li>
                    <Link to="/products">Products ({products.length})</Link>
                </li>
                {
                    topRatedProduct ? (
                        <li>
                            <Link to={`/products/${topRatedProduct.id}`}>Top Rated ({topRatedProduct.name})</Link>
                        </li>
                    ) : null
                }
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        topRatedProduct: topRatedProduct(state.products) //Prof's note: use selector for props derived from the state
    }
}

export default connect(mapStateToProps, null)(Nav)