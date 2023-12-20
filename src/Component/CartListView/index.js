import {v4 as uuidv4} from 'uuid'
import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <ul className="cart-list">
          {cartList.map(eachCartItem => (
            <CartItem cartItemDetails={eachCartItem} key={uuidv4()} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
