import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0

      const jwtToken = Cookies.get('jwt_token')
      if (jwtToken === undefined) {
        return <Redirect to="/login" />
      }
      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                className="cart-empty-image"
                alt="cart empty"
              />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <CartListView />
                <button
                  className="remove-btn"
                  type="button"
                  onClick={removeAllCartItems}
                >
                  Remove All
                </button>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
