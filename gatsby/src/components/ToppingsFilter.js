import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;

  a {
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;

    background: var(--grey);
    border-radius: 2px;

    .count {
      background: white;
      padding: 2px 5px;
      border-radius: 2px;
    }

    .name {
      color: var(--text-color, inherit);
    }

    &.active {
      background: var(--yellow);
    }

    &:hover {
      --text-color: white;
      background: var(--red);
    }
  }
`

const countPizzasInToppings = (pizzas) => {
  const toppingCount = pizzas
    .flatMap((p) => p.toppings)
    .reduce((acc, { name, id }) => {
      if (acc[id]) acc[id].count += 1
      else acc[id] = { id, name, count: 1 }
      return acc
    }, {})
  const sorted = Object.values(toppingCount).sort((a, b) => b.count - a.count)
  return sorted
}

const ToppingsFilter = () => {
  const {
    pizzas: { nodes: pizzas },
  } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `)
  const toppings = countPizzasInToppings(pizzas)
  return (
    <ToppingsStyles>
      <Link to="/pizzas" activeClassName="active">
        <span className="name">All</span>
        <span className="count">{pizzas.length}</span>
      </Link>
      {toppings.map((topping) => (
        <Link
          key={topping.id}
          to={`/topping/${topping.name}`}
          activeClassName="active"
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  )
}

export default ToppingsFilter
