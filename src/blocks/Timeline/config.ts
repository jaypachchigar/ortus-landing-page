import type { Block } from 'payload'

export const Timeline: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  labels: { singular: 'Timeline', plural: 'Timelines' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'A brief history' },
    { name: 'heading', type: 'text', defaultValue: 'Built carefully, over a decade' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'light',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Navy', value: 'dark' },
      ],
    },
    {
      name: 'milestones',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Milestone', plural: 'Milestones' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'date', type: 'text', required: true, admin: { width: '30%', description: 'e.g. "April 2013"' } },
            { name: 'title', type: 'text', required: true, admin: { width: '70%' } },
          ],
        },
        { name: 'description', type: 'textarea' },
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'text',
              defaultValue: 'flag',
              admin: {
                width: '50%',
                description:
                  'Lucide icon name in kebab-case, e.g. "flag", "building-2", "map-pin", "trending-up", "award". Browse all icons at https://lucide.dev/icons',
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
      ],
    },
  ],
}
