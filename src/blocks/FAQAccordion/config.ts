import type { Block } from 'payload'

export const FAQAccordion: Block = {
  slug: 'faqAccordion',
  interfaceName: 'FAQAccordionBlock',
  labels: { singular: 'FAQ Accordion', plural: 'FAQ Accordions' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'FAQ' },
    { name: 'heading', type: 'text', defaultValue: 'Frequently asked questions' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Question', plural: 'Questions' },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}
