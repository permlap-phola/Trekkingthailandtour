import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'feedback',
  title: 'feedback',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'name',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: "Client's image",
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
