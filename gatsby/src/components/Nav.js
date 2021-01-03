import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Logo from './Logo'

const NavStyled = styled.nav`
  margin-bottom: 3rem;
  .logo {
    transform: translateY(-25%);
  }

  ul {
    margin: 0;
    margin-top: clamp(-3rem, 1vw, -5rem);
    padding: 0;
    text-align: center;
    list-style: none;

    display: grid;
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem;
    align-items: center;

    li {
      --r: -2.5deg;
      transform: rotate(var(--r));
      order: 1;
      &:nth-child(1) {
        --r: 2.5deg;
      }
      &:nth-child(2) {
        --r: -2.5deg;
      }
      &:nth-child(4) {
        --r: 2.5deg;
      }

      &:hover {
        --r: 2deg;
      }
    }

    a {
      font-size: 2.5rem;
      text-decoration: none;
      &:hover {
        color: var(--red);
      }
      &[aria-current='page'] {
        color: var(--red);
      }
    }
  }
`

const Nav = (props) => (
  <NavStyled>
    <ul>
      <li>
        <Link to="/">Hot Now</Link>
      </li>
      <li>
        <Link to="/pizzas">Pizza Menu</Link>
      </li>
      <li>
        <Link to="/">
          <Logo />
        </Link>
      </li>
      <li>
        <Link to="/slice-masters">Our Chefs</Link>
      </li>
      <li>
        <Link to="/order">Order Up!</Link>
      </li>
    </ul>
  </NavStyled>
)

Nav.propTypes = {}

export default Nav
