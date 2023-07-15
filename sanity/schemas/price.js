import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'price',
  title: 'price of tour',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'description',
      type: 'string',
    }),
    defineField({
      name: 'price',
      title: 'price',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
