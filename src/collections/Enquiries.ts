import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

/**
 * Lead capture for the Quick Enquiry form on Home / Contact / Product pages.
 * Submissions are created by the public form endpoint and are read-only in the
 * admin for editors (no manual create, no edit — just review and export).
 */
export const Enquiries: CollectionConfig<'enquiries'> = {
  slug: 'enquiries',
  labels: { singular: 'Enquiry', plural: 'Enquiries' },
  access: {
    // Anyone can POST a new enquiry via the public form endpoint.
    create: () => true,
    // Only logged-in admins can see and delete them.
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    defaultColumns: ['brokerName', 'brokerCompany', 'propertyType', 'loanRequired', 'createdAt'],
    useAsTitle: 'brokerName',
    description: 'Quick Enquiry form submissions from the public website.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'enquirerType',
          type: 'select',
          label: 'Submitted as',
          required: true,
          defaultValue: 'broker',
          options: [
            { label: 'Broker', value: 'broker' },
            { label: 'Direct Client', value: 'direct' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'new',
          options: [
            { label: 'New', value: 'new' },
            { label: 'Contacted', value: 'contacted' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'Closed', value: 'closed' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'brokerName',
          type: 'text',
          required: true,
          label: 'Name',
          admin: { width: '50%' },
        },
        {
          name: 'brokerCompany',
          type: 'text',
          label: 'Company',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'brokerEmail',
          type: 'email',
          required: true,
          label: 'Email',
          admin: { width: '50%' },
        },
        {
          name: 'brokerPhone',
          type: 'text',
          label: 'Phone',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'propertyAddress',
      type: 'textarea',
      label: 'Property Address',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'propertyType',
          type: 'select',
          options: [
            { label: 'Residential', value: 'residential' },
            { label: 'Commercial', value: 'commercial' },
          ],
          admin: { width: '33%' },
        },
        {
          name: 'propertyValue',
          type: 'text',
          admin: { width: '33%', description: 'e.g. "£1.5M"' },
        },
        {
          name: 'loanRequired',
          type: 'text',
          admin: { width: '34%' },
        },
      ],
    },
    {
      name: 'termRequired',
      type: 'text',
      label: 'Term Loan Required',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Additional notes',
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Page the enquiry was submitted from.',
      },
    },
  ],
  timestamps: true,
}
