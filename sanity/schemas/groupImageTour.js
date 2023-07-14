import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'groupImageTour',
  title: 'group of image in each tour',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
