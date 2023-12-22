import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from './Component/Home'
import CartContext from './context/CartContext'
import LoginForm from './Component/LoginForm'
import Cart from './Component/Cart'
import './App.css'
import NotFound from './Component/NotFound'

class App extends Component {
  state = {cartList: []}

  addCartItem = item => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.dishId === item.dishId,
    )

    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (productObject.dishId === eachCartItem.dishId) {
            const updatedQuantity = eachCartItem.count + item.count

            return {...eachCartItem, count: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, item]

      this.setState({cartList: updatedCartList})
    }
  }

  deleteCartItem = (id, dishCount) => {
    console.log(id)
    console.log(dishCount)
    const {cartList} = this.state
    const filteredData = cartList.filter(
      each => each.count !== dishCount - 1 && each.dishId !== id,
    )
    this.setState({cartList: filteredData})
  }

  getCartId = dishId => {
    this.setState({cartId: dishId})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => {
      const updatedDishes = prevState.cartList.map(dish => {
        if (dish.dishId === id) {
          return {...dish, count: dish.count + 1}
        }
        return dish
      })

      return {cartList: updatedDishes}
    })
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filter = cartList.filter(each => each.dishId === id)
    this.setState({cartList: filter})
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const updatedDishes = prevState.cartList.map(dish => {
        if (dish.dishId === id) {
          return {...dish, count: dish.count - 1}
        }
        return dish
      })

      return {cartList: updatedDishes}
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList, cartId, count} = this.state
    console.log(cartList)
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            cartId,
            count,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            getCartId: this.getCartId,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            removeAllCartItems: this.removeAllCartItems,
            removeCartItem: this.removeCartItem,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Redirect to="not-found" component={NotFound} />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}
export default App
