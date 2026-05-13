import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ProductGridBlock } from '@/blocks/ProductGrid/Component'
import { ValuesGridBlock } from '@/blocks/ValuesGrid/Component'
import { StatsBarBlock } from '@/blocks/StatsBar/Component'
import { FAQAccordionBlock } from '@/blocks/FAQAccordion/Component'
import { CaseStudyShowcaseBlock } from '@/blocks/CaseStudyShowcase/Component'
import { OfficeLocationsBlock } from '@/blocks/OfficeLocations/Component'
import { EnquiryFormBlockComponent } from '@/blocks/EnquiryForm/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  productGrid: ProductGridBlock,
  valuesGrid: ValuesGridBlock,
  statsBar: StatsBarBlock,
  faqAccordion: FAQAccordionBlock,
  caseStudyShowcase: CaseStudyShowcaseBlock,
  officeLocations: OfficeLocationsBlock,
  enquiryForm: EnquiryFormBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType as keyof typeof blockComponents]
          if (Block) {
            return (
              // @ts-expect-error block-type-to-component map narrows correctly at runtime
              <Block {...block} key={index} disableInnerContainer />
            )
          }
        }
        return null
      })}
    </Fragment>
  )
}
