import type { Block } from 'payload'

export const ProductGrid: Block = {
  slug: 'productGrid',
  interfaceName: 'ProductGridBlock',
  labels: { singular: 'Product Grid', plural: 'Product Grids' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      defaultValue: 'Our Products',
      admin: { description: 'Small uppercase label above the heading.' },
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Lending solutions, built for speed',
    },
    {
      name: 'subheading',
      type: 'textarea',
    },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'featured',
      options: [
        { label: 'All featured products', value: 'featured' },
        { label: 'Residential only', value: 'residential' },
        { label: 'Commercial only', value: 'commercial' },
        { label: 'Specific products (manual)', value: 'manual' },
      ],
    },
    {
      name: 'manualProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.source === 'manual',
      },
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 6,
      admin: { description: 'Maximum number of products to display (ignored for manual mode).' },
    },
  ],
}
