import {defineField, defineType} from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Catégorie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'color',
      title: 'Couleur',
      type: 'string',
      options: {
        list: [
          {title: 'Bleu', value: '#3B82F6'},
          {title: 'Rouge', value: '#EF4444'},
          {title: 'Vert', value: '#10B981'},
          {title: 'Jaune', value: '#F59E0B'},
          {title: 'Violet', value: '#8B5CF6'},
          {title: 'Rose', value: '#EC4899'},
          {title: 'Indigo', value: '#6366F1'},
          {title: 'Gris', value: '#6B7280'},
          {title: 'Orange', value: '#F97316'},
          {title: 'Cyan', value: '#06B6D4'},
        ],
        layout: 'dropdown',
      },
      initialValue: '#3B82F6',
    }),
    defineField({
      name: 'icon',
      title: 'Icône',
      type: 'string',
      description: 'Nom de l\'icône (ex: code, design, marketing)',
    }),
    defineField({
      name: 'parent',
      title: 'Catégorie parent',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Optionnel : pour créer des sous-catégories',
    }),
    defineField({
      name: 'featured',
      title: 'Catégorie mise en avant',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      parent: 'parent.title',
    },
    prepare(selection) {
      const {title, subtitle, parent} = selection
      return {
        title,
        subtitle: parent ? `${parent} > ${subtitle || ''}` : subtitle,
      }
    },
  },
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Titre A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})
