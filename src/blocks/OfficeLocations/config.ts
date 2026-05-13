import type { Block } from 'payload'

export const OfficeLocations: Block = {
  slug: 'officeLocations',
  interfaceName: 'OfficeLocationsBlock',
  labels: { singular: 'Office Locations', plural: 'Office Locations' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Local presence' },
    { name: 'heading', type: 'text', defaultValue: 'Where you’ll find us' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'offices',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Office', plural: 'Offices' },
      fields: [
        { name: 'city', type: 'text', required: true },
        { name: 'address', type: 'textarea' },
        {
          type: 'row',
          fields: [
            { name: 'phone', type: 'text', admin: { width: '50%' } },
            { name: 'email', type: 'email', admin: { width: '50%' } },
          ],
        },
      ],
    },
  ],
}
