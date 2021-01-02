import path from 'path'

async function pizzaPages({ graphql, actions }) {
  console.log('\nCreating Pizza Pages\n')
  const pizzaTemplate = path.resolve('./src/templates/PizzaTemplate.js')
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
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    })
  })
  console.log('\nFinished creating Pizza Pages\n\n')
}

export const createPages = async ({ graphql, actions }) => {
  // Pages to create
  // 1. pizzas
  await pizzaPages({ graphql, actions })
  // 2. toppings
  // 3. slicemasters
}
