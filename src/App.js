import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from './Component/Home'
import CartContext from './context/CartContext'
import LoginForm from './Component/LoginForm'
import Cart from './Component/Cart'
import './App.css'
import NotFound from './Component/NotFound'

class App extends Component {
  state = {cartList: [], cartId: '', count: 0}

  addCartItem = item => {
    this.setState(prevState => ({cartList: [...prevState.cartList, item]}))
  }

  deleteCartItem = (id, dishCount) => {
    console.log(id)
    console.log(dishCount)
    const {cartList} = this.state
    const filteredData = cartList.filter(
      each => each.count !== dishCount - 1 && each.dishId !== id,
    )
    const a = cartList.map(
      each => each.count !== dishCount && each.dishId !== id,
    )
    console.log(a)
    this.setState({cartList: filteredData})
    console.log(filteredData)
  }

  getCartId = dishId => {
    this.setState({cartId: dishId})
  }

  incrementCartItemQuantity = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filter = cartList.filter(each => each.dishId === id)
    this.setState({cartList: filter})
  }

  
  decrementCartItemQuantity = () => {
    const {count} = this.state
    if (count > 0) {
      this.setState(prevState => ({
        count: prevState.count - 1,
      }))
    }
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
