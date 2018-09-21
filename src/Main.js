import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Nav from './Nav'
import ProductsList from './ProductsList'
import Product from './Product'
import { getProducts } from './store'
import { connect } from 'react-redux'

class Main extends Component {

    /*Prof's Notes: Can loadProducts here in componentDidMount instead of in Nav */
    componentDidMount() {
        this.props.getProducts()
    }

    render () {
        return (
            <Router>
                <Fragment>
                    <Route path="/" render={() => <Nav />} /> 
                    <Route exact path="/products" render={() => <ProductsList />} />
                    <Route path="/products/:id" render={(match, history) => <Product match={ match } history={ history }/>} />
                </Fragment>
            </Router>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(getProducts())
    }
}

export default connect(null, mapDispatchToProps)(Main)