import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
      } = value
      const {cartItemDetails} = props
      const {
        dishId,
        dishName,
        brand,
        count,
        dishPrice,
        dishImage,
      } = cartItemDetails

      const onClickDecrement = () => {
        decrementCartItemQuantity(dishId, count)
      }
      const onClickIncrement = () => {
        incrementCartItemQuantity(dishId)
      }
      const onRemoveCartItem = () => {
        removeCartItem(dishId)
      }

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={dishImage} alt={dishName} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p>dishName</p>
              <p className="cart-product-title">{dishName}</p>
              <p className="cart-product-brand">by {brand}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-button"
                onClick={onClickDecrement}
              >
                -
              </button>
              <p className="cart-quantity">{count}</p>
              <button
                type="button"
                className="quantity-button"
                onClick={onClickIncrement}
              >
                +
              </button>
            </div>
            <div className="total-price-delete-container">
              <p className="cart-total-price">Rs {dishPrice * count}/-</p>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
