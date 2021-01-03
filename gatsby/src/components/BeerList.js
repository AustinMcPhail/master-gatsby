import React from 'react'
import styled from 'styled-components'

const BeerListStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 4rem;
  margin-top: 4rem;
`

const BeerStyles = styled.div`
  padding: 2rem;
  text-align: center;

  border: solid 1px var(--grey);
  border-radius: 2px;

  img {
    // Really only works w/ firefox
    display: grid;
    align-items: center;

    width: 100%;
    height: 200px;
    object-fit: contain;

    font-size: 10px;
  }
`

function getStarRating(avg) {
  return (
    <p title={`${Math.floor(avg)} out of 5 stars`}>
      {'⭐️ '.repeat(Math.floor(avg))}
      <span style={{ filter: 'grayscale(1)' }}>
        {'⭐️ '.repeat(5 - Math.floor(avg))}
      </span>
    </p>
  )
}

const BeerList = ({ beers }) => (
  <>
    <h2 className="center">
      We have <span style={{ color: 'var(--red)' }}>{beers.length}</span> beers
      on tap for <span className="mark">dine in only!</span>
    </h2>
    <BeerListStyles>
      {beers.map((beer) => (
        <BeerStyles key={beer.id}>
          {beer.image && <img src={beer.image} alt={beer.name} />}
          <h3>{beer.name}</h3>
          <span>{beer.price}</span>
          {getStarRating(beer.rating.average)}
        </BeerStyles>
      ))}
    </BeerListStyles>
  </>
)

export default BeerList
