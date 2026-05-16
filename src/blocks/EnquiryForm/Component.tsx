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
    ? 'w-full rounded-none border-0 border-b border-white/20 bg-transparent px-0 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand focus:outline-none transition-colors'
    : 'w-full rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand focus:outline-none transition-colors'

  const labelCls = isDark
    ? 'block text-[10px] font-medium uppercase tracking-[0.2em] text-white/55 mb-2'
    : 'block text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2'

  return (
    <section className={`${wrapperCls} py-24 md:py-32`} data-theme={isDark ? 'dark' : undefined}>
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {eyebrow && <p className="editorial-eyebrow">{eyebrow}</p>}
            {heading && (
              <h2
                className={`font-display mt-6 text-balance text-4xl font-light leading-[1.05] md:text-5xl ${
                  isDark ? 'text-white' : 'text-foreground'
                }`}
              >
                {heading}
              </h2>
            )}
            <div aria-hidden className={`mt-8 h-px w-12 ${isDark ? 'bg-brand' : 'bg-brand'}`} />
            {subheading && (
              <p
                className={`mt-7 text-base leading-[1.7] ${
                  isDark ? 'text-white/70' : 'text-muted-foreground'
                }`}
              >
                {subheading}
              </p>
            )}
            <div
              className={`mt-10 space-y-3 text-sm ${
                isDark ? 'text-white/70' : 'text-muted-foreground'
              }`}
            >
              <p className="flex items-baseline gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em]">Direct line</span>
                <a className="font-mono hover:text-brand transition-colors" href="tel:02036375056">020 3637 5056</a>
              </p>
              <p className="flex items-baseline gap-3 flex-wrap">
                <span className="text-[10px] uppercase tracking-[0.2em]">Email</span>
                <a className="hover:text-brand transition-colors break-all" href="mailto:enquiries@ortussecuredfinance.co.uk">
                  enquiries@ortussecuredfinance.co.uk
                </a>
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {state === 'success' ? (
              <div
                className={`flex flex-col items-start gap-5 border p-10 md:p-12 ${
                  isDark
                    ? 'border-white/15 bg-white/[0.03] text-white'
                    : 'border-border bg-card text-foreground'
                }`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center ${
                    isDark ? 'bg-brand/20 text-brand' : 'bg-brand/10 text-brand'
                  }`}
                >
                  <Check className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="font-display text-3xl font-light">Enquiry received</h3>
                <p
                  className={`text-sm leading-[1.7] ${
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
                className={`grid gap-x-8 gap-y-6 p-10 md:grid-cols-2 md:p-12 ${
                  isDark
                    ? 'border border-white/10 bg-white/[0.02]'
                    : 'border border-border bg-card'
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
                        className={`flex-1 cursor-pointer border px-4 py-3 text-center text-sm transition-all has-[:checked]:border-brand has-[:checked]:bg-brand has-[:checked]:text-white ${
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
                    className={`inline-flex items-center justify-center gap-2 px-10 py-4 text-sm font-medium tracking-wide transition-colors disabled:opacity-60 ${
                      isDark
                        ? 'bg-brand text-white hover:bg-brand/90'
                        : 'bg-navy text-navy-foreground hover:bg-navy/90'
                    }`}
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
