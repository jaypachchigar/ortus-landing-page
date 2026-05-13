import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Ortus Secured Finance"
      width={200}
      height={50}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('h-9 w-auto md:h-10', className)}
      src="/ortus-logo.png"
    />
  )
}
