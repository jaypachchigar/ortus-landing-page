import type { Block } from 'payload'

export const CaseStudyShowcase: Block = {
  slug: 'caseStudyShowcase',
  interfaceName: 'CaseStudyShowcaseBlock',
  labels: { singular: 'Case Study Showcase', plural: 'Case Study Showcases' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Recent transactions' },
    { name: 'heading', type: 'text', defaultValue: 'Loans we closed quickly' },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'featured',
      options: [
        { label: 'Featured (auto)', value: 'featured' },
        { label: 'Latest (auto)', value: 'latest' },
        { label: 'Specific (manual)', value: 'manual' },
      ],
    },
    {
      name: 'manualItems',
      type: 'relationship',
      relationTo: 'caseStudies',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.source === 'manual',
      },
    },
    { name: 'limit', type: 'number', defaultValue: 3 },
  ],
}
