import {defineType, defineArrayMember} from 'sanity'

export const blockContent = defineType({
  title: 'Contenu',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Citation', value: 'blockquote'},
      ],
      lists: [
        {title: 'Puces', value: 'bullet'},
        {title: 'Numérotée', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Gras', value: 'strong'},
          {title: 'Italique', value: 'em'},
          {title: 'Code', value: 'code'},
          {title: 'Souligné', value: 'underline'},
          {title: 'Barré', value: 'strike-through'},
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (rule) => rule.required(),
              },
              {
                title: 'Ouvrir dans un nouvel onglet',
                name: 'blank',
                type: 'boolean',
                initialValue: false,
              },
            ],
          },
          {
            title: 'Lien interne',
            name: 'internalLink',
            type: 'object',
            fields: [
              {
                title: 'Référence',
                name: 'reference',
                type: 'reference',
                to: [
                  {type: 'blogPost'},
                  // Ajoutez d'autres types de documents si nécessaire
                ],
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
          validation: (rule) => rule.required(),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Légende',
        },
      ],
    }),
    defineArrayMember({
      type: 'object',
      name: 'codeBlock',
      title: 'Bloc de code',
      fields: [
        {
          name: 'language',
          title: 'Langage',
          type: 'string',
          options: {
            list: [
              {title: 'JavaScript', value: 'javascript'},
              {title: 'TypeScript', value: 'typescript'},
              {title: 'HTML', value: 'html'},
              {title: 'CSS', value: 'css'},
              {title: 'Python', value: 'python'},
              {title: 'JSON', value: 'json'},
              {title: 'Bash', value: 'bash'},
              {title: 'SQL', value: 'sql'},
            ],
          },
        },
        {
          name: 'code',
          title: 'Code',
          type: 'text',
          rows: 10,
        },
        {
          name: 'filename',
          title: 'Nom du fichier (optionnel)',
          type: 'string',
        },
      ],
      preview: {
        select: {
          title: 'filename',
          subtitle: 'language',
        },
        prepare(selection) {
          const {title, subtitle} = selection
          return {
            title: title || 'Bloc de code',
            subtitle: subtitle ? `Langage: ${subtitle}` : 'Code',
            media: () => '💻',
          }
        },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'callout',
      title: 'Encadré',
      fields: [
        {
          name: 'type',
          title: 'Type',
          type: 'string',
          options: {
            list: [
              {title: 'Info', value: 'info'},
              {title: 'Attention', value: 'warning'},
              {title: 'Erreur', value: 'error'},
              {title: 'Succès', value: 'success'},
              {title: 'Conseil', value: 'tip'},
            ],
          },
          initialValue: 'info',
        },
        {
          name: 'title',
          title: 'Titre (optionnel)',
          type: 'string',
        },
        {
          name: 'content',
          title: 'Contenu',
          type: 'text',
          rows: 3,
        },
      ],
      preview: {
        select: {
          title: 'title',
          subtitle: 'type',
          content: 'content',
        },
        prepare(selection) {
          const {title, subtitle, content} = selection
          const icons = {
            info: 'ℹ️',
            warning: '⚠️',
            error: '❌',
            success: '✅',
            tip: '💡',
          }
          return {
            title: title || 'Encadré',
            subtitle: content ? content.slice(0, 50) + '...' : subtitle,
            media: () => icons[subtitle as keyof typeof icons] || '📝',
          }
        },
      },
    }),
  ],
})
