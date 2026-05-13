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
          name: 'icon',
          type: 'select',
          defaultValue: 'sparkles',
          options: [
            { label: 'Expertise (sparkles)', value: 'sparkles' },
            { label: 'Reliability (shield)', value: 'shield' },
            { label: 'Integrity (handshake)', value: 'handshake' },
            { label: 'Local (map-pin)', value: 'mapPin' },
            { label: 'Innovation (lightbulb)', value: 'lightbulb' },
            { label: 'Speed (zap)', value: 'zap' },
            { label: 'Growth (trending)', value: 'trending' },
            { label: 'Quality (award)', value: 'award' },
          ],
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}
