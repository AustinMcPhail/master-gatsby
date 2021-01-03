import path from 'path'
import 'isomorphic-fetch'

async function pizzaPages({ graphql, actions }) {
  console.log('\nCreating Pizza Pages\n')
  const template = path.resolve('./src/templates/PizzaTemplate.js')
  const {
    data: {
      pizzas: { nodes: pizzas },
    },
  } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `)
  pizzas.forEach((pizza) => {
    console.log(
      `Creating page for ${pizza.name} at '/pizza/${pizza.slug.current}'`
    )
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: template,
      context: {
        slug: pizza.slug.current,
      },
    })
  })
  console.log('\nFinished creating Pizza Pages\n\n')
}

async function toppingPages({ graphql, actions }) {
  console.log('\nCreating Topping Pages\n')
  const template = path.resolve('./src/pages/pizzas.js')
  const {
    data: {
      toppings: { nodes: toppings },
    },
  } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `)
  toppings.forEach((topping) => {
    console.log(
      `Creating page for ${topping.name} at '/topping/${topping.name}'`
    )
    actions.createPage({
      path: `topping/${topping.name}`,
      component: template,
      context: {
        id: topping.id,
      },
    })
  })
  console.log('\nFinished creating Topping Pages\n\n')
}

async function beerNodes({ actions, createNodeId, createContentDigest }) {
  console.log('\nCreating Beer Nodes\n')
  const baseURL = 'https://sampleapis.com/beers/api/ale'
  const beers = await fetch(baseURL).then((resp) => resp.json())

  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(beer.name.toLowerCase().replace(/ /g, '_')),
      parent: null,
      children: [],
      internal: {
        type: `Beer`,
        mediaType: `application/json`,
        contentDigest: createContentDigest(beer),
      },
    }
    actions.createNode({ ...beer, ...nodeMeta })
  }

  console.log('Finished creating Beer Nodes\n\n')
}

export const sourceNodes = async (params) => {
  await Promise.all([beerNodes(params)])
}

export const createPages = async (params) => {
  // Pages to create
  // 1. pizzas
  // 2. toppings
  await Promise.all([pizzaPages(params), toppingPages(params)])
  // 3. slicemasters
}
