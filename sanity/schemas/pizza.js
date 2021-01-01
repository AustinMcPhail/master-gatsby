import { MdLocalPizza as icon } from 'react-icons/md'
import PriceInput from '../components/PriceInput'

export default {
  name: 'pizza',
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the Pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Iamge',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      inputComponent: PriceInput,
      desciption: 'Price of the Pizza in cents',
      validation: (Rule) => Rule.min(1000).max(50000),
      // TODO: Add custom input component
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
      description: 'Name of the Pizza',
    },
  ],
  preview: {
    select: {
      name: 'name',
      price: 'price',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    prepare: ({ name, price, media, ...toppings }) => ({
      title: `${name}${price ? ` - $${(price / 100).toFixed(2)}` : ''}`,
      media,
      subtitle: `${Object.values(toppings).filter(Boolean).join(', ')}`,
    }),
  },
}
