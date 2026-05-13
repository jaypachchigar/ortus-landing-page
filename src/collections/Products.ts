import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'
import { defaultLexical } from '../fields/defaultLexical'

export const Products: CollectionConfig<'products'> = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'category', 'loanRange', '_status'],
    useAsTitle: 'name',
    description:
      'Lending products shown on the home and Products pages. Each product gets its own detail page at /products/<slug>.',
  },
  versions: {
    drafts: {
      autosave: { interval: 250 },
    },
    maxPerDoc: 25,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Residential Bridging"' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'residential',
      options: [
        { label: 'Residential', value: 'residential' },
        { label: 'Commercial', value: 'commercial' },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Short one- or two-sentence description used in product cards on the home and Products pages.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Key Facts',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'loanRange',
                  type: 'text',
                  admin: { width: '50%', description: 'e.g. "£500,000 – £25 million"' },
                },
                {
                  name: 'term',
                  type: 'text',
                  admin: { width: '50%', description: 'e.g. "3–36 months"' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'maxLtv',
                  type: 'text',
                  label: 'Max LTV',
                  admin: { width: '33%', description: 'e.g. "Up to 70%"' },
                },
                {
                  name: 'arrangementFee',
                  type: 'text',
                  admin: { width: '33%', description: 'e.g. "2%"' },
                },
                {
                  name: 'interestRate',
                  type: 'text',
                  admin: { width: '34%', description: 'e.g. "From 0.499% pcm"' },
                },
              ],
            },
            {
              name: 'useCases',
              type: 'array',
              label: 'Use cases',
              labels: { singular: 'Use case', plural: 'Use cases' },
              fields: [{ name: 'item', type: 'text', required: true }],
            },
            {
              name: 'borrowerTypes',
              type: 'array',
              label: 'Eligible borrowers',
              fields: [{ name: 'item', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Description',
          fields: [
            {
              name: 'description',
              type: 'richText',
              editor: defaultLexical,
            },
          ],
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show this product on the home page.',
        position: 'sidebar',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    slugField({ fieldToUse: 'name' }),
  ],
}
