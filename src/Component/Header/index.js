import {IoMdCart} from 'react-icons/io'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {restaurantName} = props

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length
        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )
  console.log({restaurantName})

  return (
    <div className="header-container">
      <Link to="/">
        <h1 className="website-name">UNI Resto Cafe</h1>{' '}
      </Link>
      <div className="orders">
        <p className="order">My Orders</p>
        <Link to="/cart">
          <IoMdCart className="cart-icon" />
        </Link>
        {renderCartItemsCount()}
        <Link to="/login">
          <button type="button" onClick={onClickLogout}>
            Logout
          </button>
        </Link>
      </div>
    </div>
  )
}
export default withRouter(Header)
