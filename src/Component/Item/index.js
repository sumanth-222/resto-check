import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CartContext from '../../context/CartContext'

import './index.css'

class Item extends Component {
  state = {quantity: 1}
  /* renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length
        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  ) */

  renderItem = () => (
    <CartContext.Consumer>
      {value => {
        const {addCartItem, deleteCartItem} = value
        const {quantity} = this.state
        const {categoryList, updating, deleting} = this.props
        const onAddItem = id => {
          this.setState(prevState => ({quantity: prevState.quantity + 1}))
          const filterCart = categoryList.filter(each => each.dishId === id)
          addCartItem(...filterCart, quantity, uuidv4)
          updating(id)
        }

       const onAddCart = (id, itemCount) => {
          if (itemCount > 0) {
            const filterCart = categoryList.filter(each => each.dishId === id)
            addCartItem(...filterCart, quantity, uuidv4)
          }
        }

        const decrease = (dishId, dishCount) => {
          this.setState(prevState => ({quantity: prevState.quantity - 1}))
          deleteCartItem(dishId, dishCount)
          deleting(dishId.toString(), Number(dishCount) - 1)
        }

        return (
          <div>
            {categoryList.map(item => (
              <li className="item-container" key={item.dishId}>
                <div className="item-details">
                  <h1 className="dish-name">{item.dishName}</h1>
                  <p className="currency-type">
                    {item.dishCurrency} {item.dishPrice}
                  </p>
                  <p className="description">{item.dishDescription}</p>
                  {item.dishAvailability ? (
                    <div className="button-card">
                      <button
                        className="btn"
                        type="button"
                        onClick={() => decrease(item.dishId, item.count)}
                      >
                        -
                      </button>
                      <p className="count">{item.count}</p>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => onAddItem(item.dishId)}
                      >
                        +
                      </button>
                    </div>
                  ) : null}
                 {item.count > 0 ? (
                    <button
                      type="button"
                      onClick={() => onAddCart(item.dishId, item.count)}
                    >
                      ADD TO CART
                    </button>
                  ) : null}
                  {item.dishAvailability ? (
                    null : (
                    <p className="not-available">Not Available</p>
                  )}
                  {item.addOnCat.length > 0 ? (
                    <p className="customize">Customizations available</p>
                  ) : null}
                </div>
                <div className="image-card">
                  <p className="calories">{item.dishCalories} Calories</p>
                  <img src={item.dishImage} className="image" alt="Dish" />
                </div>
              </li>
            ))}
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return <div>{this.renderItem()}</div>
  }
}

export default Item
