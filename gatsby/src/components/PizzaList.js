import { Link } from 'gatsby'
import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`

const PizzaStyles = styled.div`
  display: grid;
  /* Take row sizing from some ancestor's Grid */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 500px;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
`

const Pizza = ({ pizza }) => (
  <PizzaStyles>
    <Link to={`/pizza/${pizza.slug.current}`}>
      <h2>
        <span className="mark">{pizza.name}</span>
      </h2>
    </Link>
    <p>{pizza.toppings.map((t) => t.name).join(', ')}</p>
    <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
  </PizzaStyles>
)

const PizzaList = ({ pizzas }) => (
  <PizzaGridStyles>
    {pizzas.map((p) => (
      <Pizza pizza={p} key={p.id} />
    ))}
  </PizzaGridStyles>
)

export default PizzaList
