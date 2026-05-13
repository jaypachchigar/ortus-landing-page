'use client'

import React, { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import type { EnquiryFormBlock as Props } from '@/payload-types'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export const EnquiryFormBlockComponent: React.FC<Props> = ({
  eyebrow,
  heading,
  subheading,
  background,
}) => {
  const pathname = usePathname()
  const [state, setState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const isDark = background !== 'light'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    setErrorMessage(null)

    const formData = new FormData(e.currentTarget)
    const payload = {
      enquirerType: formData.get('enquirerType') || 'broker',
      brokerName: formData.get('brokerName'),
      brokerCompany: formData.get('brokerCompany'),
      brokerEmail: formData.get('brokerEmail'),
      brokerPhone: formData.get('brokerPhone'),
      propertyAddress: formData.get('propertyAddress'),
      propertyType: formData.get('propertyType') || undefined,
      propertyValue: formData.get('propertyValue'),
      loanRequired: formData.get('loanRequired'),
      termRequired: formData.get('termRequired'),
      message: formData.get('message'),
      source: pathname,
    }

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.errors?.[0]?.message || 'Submission failed')
      }
      setState('success')
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Submission failed')
      setState('error')
    }
  }

  const wrapperCls = isDark
    ? 'bg-navy text-navy-foreground'
    : 'bg-secondary/40 text-foreground'

  const inputCls = isDark
    ? 'w-full rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30'
    : 'w-full rounded-md border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30'

  const labelCls = isDark
    ? 'block text-xs font-medium uppercase tracking-wider text-white/60 mb-2'
    : 'block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2'

  return (
    <section className={`${wrapperCls} py-20 md:py-28`} data-theme={isDark ? 'dark' : undefined}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2
                className={`font-display mt-3 text-4xl leading-tight md:text-5xl md:leading-[1.05] ${
                  isDark ? 'text-white' : 'text-foreground'
                }`}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p
                className={`mt-5 text-base leading-relaxed ${
                  isDark ? 'text-white/70' : 'text-muted-foreground'
                }`}
              >
                {subheading}
              </p>
            )}
            <div
              className={`mt-8 space-y-2 text-sm ${
                isDark ? 'text-white/70' : 'text-muted-foreground'
              }`}
            >
              <p>Direct line: <a className="hover:text-brand" href="tel:02036375056">020 3637 5056</a></p>
              <p>
                Email:{' '}
                <a className="hover:text-brand" href="mailto:enquiries@ortussecuredfinance.co.uk">
                  enquiries@ortussecuredfinance.co.uk
                </a>
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {state === 'success' ? (
              <div
                className={`flex flex-col items-start gap-4 rounded-2xl border p-10 ${
                  isDark
                    ? 'border-white/15 bg-white/5 text-white'
                    : 'border-border bg-background text-foreground'
                }`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${
                    isDark ? 'bg-brand/20 text-brand' : 'bg-brand/10 text-brand'
                  }`}
                >
                  <Check className="h-5 w-5" />
                </span>
                <h3 className="font-display text-2xl">Enquiry received</h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? 'text-white/70' : 'text-muted-foreground'
                  }`}
                >
                  Thank you. A member of our underwriting team will be in touch shortly to discuss
                  your case in detail.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className={`grid gap-5 rounded-2xl p-8 md:grid-cols-2 md:p-10 ${
                  isDark
                    ? 'border border-white/10 bg-white/[0.03]'
                    : 'border border-border bg-background'
                }`}
              >
                <div className="md:col-span-2">
                  <label className={labelCls}>I am a *</label>
                  <div className="flex gap-2">
                    {[
                      { v: 'broker', l: 'Broker' },
                      { v: 'direct', l: 'Direct Client' },
                    ].map((opt) => (
                      <label
                        key={opt.v}
                        className={`flex-1 cursor-pointer rounded-md border px-4 py-3 text-center text-sm transition-all has-[:checked]:border-brand has-[:checked]:bg-brand/10 has-[:checked]:text-brand ${
                          isDark
                            ? 'border-white/15 text-white/70'
                            : 'border-border text-muted-foreground'
                        }`}
                      >
                        <input
                          type="radio"
                          name="enquirerType"
                          value={opt.v}
                          defaultChecked={opt.v === 'broker'}
                          className="sr-only"
                        />
                        {opt.l}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={labelCls} htmlFor="brokerName">
                    Name *
                  </label>
                  <input id="brokerName" name="brokerName" required className={inputCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="brokerCompany">
                    Company
                  </label>
                  <input id="brokerCompany" name="brokerCompany" className={inputCls} />
                </div>

                <div>
                  <label className={labelCls} htmlFor="brokerEmail">
                    Email *
                  </label>
                  <input
                    id="brokerEmail"
                    name="brokerEmail"
                    type="email"
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls} htmlFor="brokerPhone">
                    Phone
                  </label>
                  <input id="brokerPhone" name="brokerPhone" type="tel" className={inputCls} />
                </div>

                <div className="md:col-span-2">
                  <label className={labelCls} htmlFor="propertyAddress">
                    Property address
                  </label>
                  <input id="propertyAddress" name="propertyAddress" className={inputCls} />
                </div>

                <div>
                  <label className={labelCls} htmlFor="propertyType">
                    Property type
                  </label>
                  <select id="propertyType" name="propertyType" className={inputCls}>
                    <option value="">Select…</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls} htmlFor="propertyValue">
                    Property value
                  </label>
                  <input id="propertyValue" name="propertyValue" className={inputCls} />
                </div>

                <div>
                  <label className={labelCls} htmlFor="loanRequired">
                    Loan required
                  </label>
                  <input id="loanRequired" name="loanRequired" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="termRequired">
                    Term required
                  </label>
                  <input id="termRequired" name="termRequired" className={inputCls} />
                </div>

                <div className="md:col-span-2">
                  <label className={labelCls} htmlFor="message">
                    Anything else?
                  </label>
                  <textarea id="message" name="message" rows={3} className={inputCls} />
                </div>

                <div className="md:col-span-2">
                  {errorMessage && (
                    <p className="mb-3 text-sm text-red-500" role="alert">
                      {errorMessage}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={state === 'submitting'}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:opacity-60"
                  >
                    {state === 'submitting' && <Loader2 className="h-4 w-4 animate-spin" />}
                    {state === 'submitting' ? 'Sending…' : 'Submit enquiry'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
