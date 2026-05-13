import type { Block } from 'payload'

export const EnquiryFormBlock: Block = {
  slug: 'enquiryForm',
  interfaceName: 'EnquiryFormBlock',
  labels: { singular: 'Enquiry Form', plural: 'Enquiry Forms' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Quick enquiry' },
    { name: 'heading', type: 'text', defaultValue: 'Tell us about your deal' },
    {
      name: 'subheading',
      type: 'textarea',
      defaultValue:
        'A senior underwriter will review your enquiry and respond within hours. Submissions go straight to our deal team.',
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'navy',
      options: [
        { label: 'Navy (recommended)', value: 'navy' },
        { label: 'Light', value: 'light' },
      ],
    },
  ],
}
