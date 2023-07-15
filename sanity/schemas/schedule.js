import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'schedule',
  title: 'schedule of tour',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'title',
      type: 'string',
    }),
    defineField({
      name: 'day',
      title: 'day',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'description',
      type: 'blockContent',
    }),
    defineField({
      name: 'time',
      title: 'time',
      type: 'datetime',
      options: {
        timeFormat: 'HH:mm',
        timeStep: 5,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'time',
    },
  },
})
