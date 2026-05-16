'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircleIcon,
  ArrowRightIcon,
  CalendarBlankIcon,
  ClockIcon,
  MapPinIcon,
} from '@phosphor-icons/react'

export type EventMeta = {
  id: string
  title: string
  date: string
  time: string
  location: string
  spotsLeft: number
  category: string
  categoryTone: string
  isHybrid?: boolean
}

type FormData = {
  firstName: string
  lastName: string
  email: string
  studentId: string
  course: string
  year: string
  notes: string
}

const initial: FormData = {
  firstName: '', lastName: '', email: '', studentId: '',
  course: '', year: '', notes: '',
}

const ENDPOINT = process.env.NEXT_PUBLIC_REGISTRATION_ENDPOINT ?? ''
const SECRET   = process.env.NEXT_PUBLIC_REGISTRATION_SECRET   ?? ''

export default function EventRegisterForm({ event }: { event: EventMeta }) {
  const [form,        setForm]        = useState<FormData>(initial)
  const [errors,      setErrors]      = useState<Partial<FormData>>({})
  const [submitted,   setSubmitted]   = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [submitError, setSubmitError] = useState('')

  const update = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = (): boolean => {
    const e: Partial<FormData> = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim())  e.lastName  = 'Required'
    if (!form.email.trim())     e.email     = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.course.trim())    e.course    = 'Required'
    if (!form.year)             e.year      = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    setSubmitError('')

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          secret:     SECRET,
          eventId:    event.id,
          eventTitle: event.title,
          eventDate:  event.date,
          firstName:  form.firstName,
          lastName:   form.lastName,
          email:      form.email,
          studentId:  form.studentId,
          course:     form.course,
          year:       form.year,
          notes:      form.notes,
        }),
      })

      const data = await res.json().catch(() => ({ ok: false, error: 'Invalid response' })) as { ok?: boolean; error?: string }
      if (res.ok && data.ok) {
        setSubmitted(true)
      } else {
        setSubmitError(data.error ?? 'Something went wrong — please try again.')
      }
    } catch {
      setSubmitError('Network error — check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="success-card p-10 rounded-2xl text-center"
        >
          <div className="success-icon w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon size={28} weight="duotone" className="text-accent" />
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-3 text-primary">
            You&apos;re registered!
          </h3>
          <p className="text-sm leading-relaxed max-w-[40ch] mx-auto mb-2 text-secondary">
            Thanks, {form.firstName}. Your spot is confirmed for{' '}
            <span className="text-primary font-medium">{event.title}</span>.
          </p>
          <p className="text-xs text-muted mb-8">
            A confirmation has been sent to {form.email}.
          </p>
          <div className="bg-card border-default rounded-xl p-4 text-left space-y-2 max-w-[36ch] mx-auto">
            <div className="flex items-center gap-2 text-xs text-muted">
              <CalendarBlankIcon size={12} />{event.date}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <ClockIcon size={12} />{event.time}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted">
              <MapPinIcon size={12} />{event.location}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit}
          noValidate
          className="form-card rounded-2xl space-y-6"
        >
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-1 text-primary">
              Reserve your spot
            </h2>
            <p className="text-sm text-secondary">
              Free for all current University of Melbourne students.
            </p>
          </div>

          {/* Pre-filled event summary */}
          <div className={`p-4 rounded-xl border-default bg-overlay-30 tone-${event.categoryTone}`}>
            <p className="text-[10px] font-semibold text-accent uppercase tracking-widest mb-2">
              Registering for
            </p>
            <p className="text-sm font-semibold text-primary mb-2 leading-snug">{event.title}</p>
            <div className="space-y-1">
              {[
                { icon: CalendarBlankIcon, text: event.date },
                { icon: ClockIcon,         text: event.time },
                { icon: MapPinIcon,        text: event.location },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-muted">
                  <Icon size={11} />{text}
                </div>
              ))}
            </div>
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { field: 'firstName' as const, label: 'First name', placeholder: 'Priya' },
              { field: 'lastName'  as const, label: 'Last name',  placeholder: 'Mehta' },
            ].map(({ field, label, placeholder }) => (
              <div key={field}>
                <label className="form-label">{label}</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={placeholder}
                  value={form[field]}
                  onChange={e => update(field, e.target.value)}
                />
                {errors[field] && <p className="text-xs text-red-400 mt-1.5">{errors[field]}</p>}
              </div>
            ))}
          </div>

          {/* Email */}
          <div>
            <label className="form-label">University email</label>
            <input
              type="email"
              className="form-input"
              placeholder="p.mehta@student.unimelb.edu.au"
              value={form.email}
              onChange={e => update('email', e.target.value)}
            />
            {errors.email && <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>}
          </div>

          {/* Student ID */}
          <div>
            <label className="form-label">
              UniMelb student ID{' '}
              <span className="text-muted font-normal">(optional — leave blank if not from UniMelb)</span>
            </label>
            <input
              type="text"
              inputMode="numeric"
              className="form-input"
              placeholder="1234567"
              value={form.studentId}
              onChange={e => update('studentId', e.target.value)}
            />
          </div>

          {/* Course + Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Course / major</label>
              <input
                type="text"
                className="form-input"
                placeholder="Bachelor of Science (CS)"
                value={form.course}
                onChange={e => update('course', e.target.value)}
              />
              {errors.course && <p className="text-xs text-red-400 mt-1.5">{errors.course}</p>}
            </div>
            <div>
              <label className="form-label">Year of study</label>
              <select
                className="form-input form-select"
                value={form.year}
                onChange={e => update('year', e.target.value)}
              >
                <option value="" disabled>Select year</option>
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
                <option value="masters">Masters</option>
                <option value="phd">PhD</option>
              </select>
              {errors.year && <p className="text-xs text-red-400 mt-1.5">{errors.year}</p>}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="form-label">
              Dietary requirements or notes{' '}
              <span className="text-muted font-normal">(optional)</span>
            </label>
            <textarea
              rows={3}
              className="form-input resize-none"
              placeholder="Any dietary requirements, accessibility needs, or notes for the organizers..."
              value={form.notes}
              onChange={e => update('notes', e.target.value)}
            />
          </div>

          {/* Submit error */}
          {submitError && (
            <p className="text-xs text-red-400 text-center -mb-2">{submitError}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-accent w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="spinner w-4 h-4 rounded-full border-2 animate-spin" />
                Registering...
              </>
            ) : (
              <>
                Confirm registration <ArrowRightIcon size={16} weight="bold" />
              </>
            )}
          </button>

          <p className="text-xs text-center text-muted">
            By registering, you agree to receive event updates from AWS Cloud Club UniMelb.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
