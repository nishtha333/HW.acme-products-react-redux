import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Nav from './Nav'
import ProductsList from './ProductsList'

class Main extends Component {

    render () {
        return (
            <Router>
                <div>
                    <Route path="/" render={() => <Nav />} /> 
                    <Route path="/products" render={() => <ProductsList />} />
                </div>
            </Router>
        )
    }
}

export default Main