import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'subTourDetail',
  title: 'sub tour detail',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('This field is required'),
    }),
    defineField({
      name: 'description',
      title: 'description',
      type: 'blockContent',
    }),
    defineField({
      name: 'schedule',
      title: 'schedule',
      type: 'array',
      of: [{type: 'reference', to: {type: 'schedule'}}],
    }),
    defineField({
      name: 'price',
      title: 'price of tours',
      type: 'array',
      of: [{type: 'reference', to: {type: 'price'}}],
      validation: (Rule) => Rule.required().error('This field is required'),
    }),
  ],
})
