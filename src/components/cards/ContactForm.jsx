import { useState } from 'react'
import { heroData } from '../../data/info'

export default function ContactForm() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    if (status === 'sending') return

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT
    if (!endpoint) {
      setError('The form is currently unavailable. Please use the email link instead.')
      return
    }

    const form = event.currentTarget
    setStatus('sending')
    setError('')

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (!response.ok)
        throw new Error('Message could not be sent. Please try again or email me.')
      form.reset()
      setStatus('sent')
    } catch (error) {
      setStatus('idle')
      setError(error instanceof Error ? error.message : 'Please try again.')
    }
  }

  return (
    <form className="contact-form surface" onSubmit={handleSubmit}>
      <h3>Start a conversation.</h3>
      <div className="form-fields">
        <div>
          <label htmlFor="contact-name">Your name</label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            required
            placeholder="Alex Taylor"
          />
        </div>
        <div>
          <label htmlFor="contact-email">Email address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="alex@example.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message">What’s on your mind?</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder="Tell me a little about your idea…"
        />
      </div>
      <button className="button-primary" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}{' '}
        <span aria-hidden="true">↗</span>
      </button>
      {status === 'sent' && (
        <p className="form-success" role="status">
          Thanks. Your message has been sent.
        </p>
      )}
      {error && (
        <p className="form-error" role="alert">
          {error} <a href={`mailto:${heroData.email}`}>Email me</a>
        </p>
      )}
    </form>
  )
}
