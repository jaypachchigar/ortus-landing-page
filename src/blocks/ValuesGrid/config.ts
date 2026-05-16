import type { Block } from 'payload'

export const ValuesGrid: Block = {
  slug: 'valuesGrid',
  interfaceName: 'ValuesGridBlock',
  labels: { singular: 'Values Grid', plural: 'Values Grids' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'What we stand for' },
    { name: 'heading', type: 'text', defaultValue: 'Five principles that shape every loan' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'values',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Value', plural: 'Values' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'text',
              defaultValue: 'sparkles',
              admin: {
                width: '50%',
                description:
                  'Lucide icon name in kebab-case, e.g. "sparkles", "shield-check", "handshake", "map-pin". Browse all icons at https://lucide.dev/icons',
              },
            },
            {
              name: 'customIcon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                width: '50%',
                description: 'Optional. Upload an SVG to override the Lucide icon above.',
              },
            },
          ],
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}
