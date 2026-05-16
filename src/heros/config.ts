import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        { label: 'None', value: 'none' },
        { label: 'High Impact', value: 'highImpact' },
        { label: 'Medium Impact', value: 'mediumImpact' },
        { label: 'Low Impact', value: 'lowImpact' },
      ],
      required: true,
    },
    // Legacy field — preserved so schema-rename detection stays quiet during
    // dev push. Not used by the renderer. Keep empty in admin.
    {
      name: 'richText',
      type: 'richText',
      label: false,
      admin: {
        description:
          'Deprecated — use the Eyebrow / Headline / Subheadline fields below. This field is kept only for schema compatibility.',
        condition: () => false,
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'eyebrow',
      type: 'text',
      admin: { description: 'Small uppercase label shown above the headline. Optional.' },
    },
    {
      name: 'headline',
      type: 'text',
      admin: { description: 'The big H1.' },
    },
    {
      name: 'subheadline',
      type: 'textarea',
      admin: { description: 'Lead paragraph below the headline.' },
    },
    linkGroup({ overrides: { maxRows: 2 } }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
        description: 'Image shown beside the headline (HighImpact) or below it (MediumImpact).',
      },
    },
  ],
  label: false,
}
