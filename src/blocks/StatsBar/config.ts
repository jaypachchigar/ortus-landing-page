import type { Block } from 'payload'

export const StatsBar: Block = {
  slug: 'statsBar',
  interfaceName: 'StatsBarBlock',
  labels: { singular: 'Stats Bar', plural: 'Stats Bars' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Stat', plural: 'Stats' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
          ],
        },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'light',
      options: [
        { label: 'Light', value: 'light' },
        { label: 'Navy', value: 'dark' },
      ],
    },
  ],
}
