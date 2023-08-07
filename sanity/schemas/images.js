import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'images',
  title: 'images of tour',
  type: 'document',
  fields: [
    defineField({
      name: 'description',
      title: 'description',
      type: 'string',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('This field is required'),
    }),
  ],
})
