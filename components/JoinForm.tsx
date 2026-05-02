'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ArrowRight } from '@phosphor-icons/react'

type FormData = {
  firstName: string
  lastName: string
  email: string
  course: string
  year: string
  experience: string
  motivation: string
  source: string
}

const initial: FormData = {
  firstName: '', lastName: '', email: '',
  course: '', year: '', experience: '',
  motivation: '', source: '',
}

export default function JoinForm() {
  const [form,      setForm]      = useState<FormData>(initial)
  const [errors,    setErrors]    = useState<Partial<FormData>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

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
    if (!form.course.trim())    e.course     = 'Required'
    if (!form.year)             e.year       = 'Required'
    if (!form.experience)       e.experience = 'Required'
    if (!form.motivation.trim()) e.motivation = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
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
          <div
            className="success-icon w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={28} weight="duotone" className="text-accent" />
          </div>
          <h3 className="text-xl font-bold tracking-tight mb-3 text-primary">
            Application received
          </h3>
          <p className="text-sm leading-relaxed max-w-[40ch] mx-auto mb-2 text-secondary">
            Thanks, {form.firstName}. We&apos;ll review your application and get back
            to you within 3 business days.
          </p>
          <p className="text-xs text-muted">
            Check {form.email} for confirmation.
          </p>
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
              Apply for membership
            </h2>
            <p className="text-sm text-secondary">
              Free for all current University of Melbourne students.
            </p>
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { field: 'firstName' as const, label: 'First name', placeholder: 'Priya'  },
              { field: 'lastName'  as const, label: 'Last name',  placeholder: 'Mehta'  },
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

          {/* AWS Experience selector */}
          <div>
            <label className="form-label">AWS experience level</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
              {['None', 'Beginner', 'Intermediate', 'Advanced'].map((level) => {
                const active = form.experience === level
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => update('experience', level)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all duration-200 ${active ? 'experience-pill-active' : 'experience-pill'}`}
                  >
                    {level}
                  </button>
                )
              })}
            </div>
            {errors.experience && <p className="text-xs text-red-400 mt-1.5">{errors.experience}</p>}
          </div>

          {/* Motivation */}
          <div>
            <label className="form-label">Why do you want to join?</label>
            <textarea
              rows={4}
              className="form-input resize-none"
              placeholder="Tell us what you're hoping to build, learn, or achieve..."
              value={form.motivation}
              onChange={e => update('motivation', e.target.value)}
            />
            {errors.motivation && <p className="text-xs text-red-400 mt-1.5">{errors.motivation}</p>}
          </div>

          {/* Source */}
          <div>
            <label className="form-label">How did you hear about us? (optional)</label>
            <select
              className="form-input form-select"
              value={form.source}
              onChange={e => update('source', e.target.value)}
            >
              <option value="">Select an option</option>
              <option value="friend">Friend or classmate</option>
              <option value="social">Social media</option>
              <option value="poster">Campus poster / flyer</option>
              <option value="lecturer">Lecturer or tutor</option>
              <option value="search">Search engine</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-accent w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span
                  className="spinner w-4 h-4 rounded-full border-2 animate-spin"
                />
                Submitting...
              </>
            ) : (
              <>Submit Application <ArrowRight size={16} weight="bold" /></>
            )}
          </button>

          <p className="text-xs text-center text-muted">
            By submitting, you agree to receive occasional emails about club events and updates.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
