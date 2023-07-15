import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'package-tour-detail',
  title: 'tour detail',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('This field is required'),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'string',
      validation: (Rule) => Rule.required().error('This field is required'),
    }),
    defineField({
      name: 'description',
      title: 'description',
      type: 'string',
      validation: (Rule) => Rule.required().error('This field is required'),
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
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('This field is required'),
    }),

    defineField({
      name: 'images',
      title: 'images',
      type: 'array',
      of: [{type: 'reference', to: {type: 'groupImageTour'}}],
      validation: (Rule) => Rule.required().length(6).error('Exactly 6 images required.'),
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
      validation: (Rule) => Rule.required().error('This field is required'),
    }),

    defineField({
      name: 'subTour',
      title: 'sub tours',
      type: 'array',
      of: [{type: 'reference', to: {type: 'subTourDetail'}}],
      validation: (Rule) => Rule.required().error('This field is required'),
    }),
  ],
})
