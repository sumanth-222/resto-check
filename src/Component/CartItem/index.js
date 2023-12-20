import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        deleteCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        count,
      } = value
      const {cartItemDetails} = props
      const {id, dishName, brand, dishPrice, dishImage} = cartItemDetails
      const onDeleteCartItem = () => {
        deleteCartItem(id)
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
                onClick={decrementCartItemQuantity}
              >
                -
              </button>
              <p className="cart-quantity">{count}</p>
              <button
                type="button"
                className="quantity-button"
                onClick={incrementCartItemQuantity}
              >
                +
              </button>
            </div>
            <div className="total-price-delete-container">
              <p className="cart-total-price">Rs {dishPrice * count}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onDeleteCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onDeleteCartItem}
          >
            x
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
