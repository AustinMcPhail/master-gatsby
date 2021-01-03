import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import PizzaList from '../components/PizzaList'
import ToppingsFilter from '../components/ToppingsFilter'

const PizzasPage = ({
  data: {
    pizzas: { nodes: pizzas },
  },
}) => (
  <>
    <ToppingsFilter />
    <PizzaList pizzas={pizzas} />
  </>
)

PizzasPage.propTypes = {}

export default PizzasPage

export const query = graphql`
  query($id: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { id: { eq: $id } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          name
          vegetarian
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`
