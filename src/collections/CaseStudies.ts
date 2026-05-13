import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { defaultLexical } from '../fields/defaultLexical'

export const CaseStudies: CollectionConfig<'caseStudies'> = {
  slug: 'caseStudies',
  labels: {
    singular: 'Case Study',
    plural: 'Case Studies',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'loanAmount', 'location', 'completedAt', '_status'],
    useAsTitle: 'title',
    description: 'Real-world lending scenarios used to build trust with brokers and borrowers.',
  },
  versions: {
    drafts: {
      autosave: { interval: 250 },
    },
    maxPerDoc: 25,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: { description: 'One or two sentences used on cards and listing pages.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'loanAmount',
          type: 'text',
          admin: { width: '33%', description: 'e.g. "£2.4M"' },
        },
        {
          name: 'propertyType',
          type: 'text',
          admin: { width: '33%', description: 'e.g. "Commercial mixed-use"' },
        },
        {
          name: 'location',
          type: 'text',
          admin: { width: '34%', description: 'e.g. "London"' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'term',
          type: 'text',
          admin: { width: '50%', description: 'e.g. "12 months"' },
        },
        {
          name: 'completedAt',
          type: 'date',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'body',
      type: 'richText',
      editor: defaultLexical,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show on the home page case studies section.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    slugField({ fieldToUse: 'title' }),
  ],
}
