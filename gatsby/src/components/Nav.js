import React from 'react'
import PropTypes from 'prop-types'
import { Link, navigate } from 'gatsby'

function goSliceMasters() {
  setTimeout(() => {
    navigate('/beers')
  }, 2000)
}

const Nav = (props) => (
  <nav>
    <ul>
      <li>
        <Link to="/">Hot Now</Link>
      </li>
      <li>
        <Link to="/pizzas/">Pizza Menu</Link>
      </li>
      <li>
        <Link to="/">LOGO</Link>
      </li>
      <li>
        <Link to="/slice-masters">Our Chefs</Link>
      </li>
      <li>
        <Link to="/order">Your Order</Link>
      </li>
    </ul>
  </nav>
)

Nav.propTypes = {}

export default Nav
