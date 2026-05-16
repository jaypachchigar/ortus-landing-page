'use client'

import React from 'react'
import { DynamicIcon } from 'lucide-react/dynamic'
import { Sparkles } from 'lucide-react'

import type { Media } from '@/payload-types'

type Props = {
  name?: string | null
  customIcon?: number | Media | null
  className?: string
  strokeWidth?: number
  size?: number
}

const toKebab = (raw: string): string =>
  raw
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

export const CmsIcon: React.FC<Props> = ({
  name,
  customIcon,
  className = 'h-5 w-5',
  strokeWidth = 1.5,
  size,
}) => {
  if (customIcon && typeof customIcon === 'object' && customIcon.url) {
    return (
      <img
        src={customIcon.url}
        alt={customIcon.alt || ''}
        className={className}
        width={size}
        height={size}
        aria-hidden={!customIcon.alt}
      />
    )
  }

  const lucideName = name ? toKebab(name) : ''
  if (!lucideName) {
    return <Sparkles className={className} strokeWidth={strokeWidth} />
  }

  return (
    <DynamicIcon
      name={lucideName as never}
      className={className}
      strokeWidth={strokeWidth}
      fallback={() => <Sparkles className={className} strokeWidth={strokeWidth} />}
    />
  )
}
