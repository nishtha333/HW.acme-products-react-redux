import React, { Component, Fragment } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Nav from './Nav'
import ProductsList from './ProductsList'
import Product from './Product'

class Main extends Component {

    render () {
        return (
            <Router>
                <Fragment>
                    <Route path="/" render={() => <Nav />} /> 
                    <Route exact path="/products" render={() => <ProductsList />} />
                    <Route path="/products/:id" render={(match) => <Product match={ match } />} />
                </Fragment>
            </Router>
        )
    }
}

export default Main