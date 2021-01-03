import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import BeerList from '../components/BeerList'

const BeersPage = ({
  data: {
    beers: { nodes: beers },
  },
}) => (
  <>
    <BeerList beers={beers} />
  </>
)

BeersPage.propTypes = {}

export default BeersPage

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        rating {
          reviews
          average
        }
        image
      }
    }
  }
`
