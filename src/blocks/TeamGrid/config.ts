import type { Block } from 'payload'

export const TeamGrid: Block = {
  slug: 'teamGrid',
  interfaceName: 'TeamGridBlock',
  labels: { singular: 'Team Grid', plural: 'Team Grids' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Our team' },
    { name: 'heading', type: 'text', defaultValue: 'The people behind every loan' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'members',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Team member', plural: 'Team members' },
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'role', type: 'text', required: true, admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'email', type: 'email', admin: { width: '50%' } },
            { name: 'phone', type: 'text', admin: { width: '50%' } },
          ],
        },
        { name: 'inMemoriam', type: 'checkbox', label: 'Show as "In Memoriam"' },
      ],
    },
  ],
}
