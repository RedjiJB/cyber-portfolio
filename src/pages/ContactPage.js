import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { TopNavbar } from '../components/nav/TopNavbar';
import DarkSphere from '../components/background/DarkSphere';
import resume from '../settings/resume.json';
import './SubPage.css';
import './ContactPage.css';

const MAX_MESSAGE = 500;
const WAIT_SECONDS = 600; // one message per 10 minutes per browser
const STORAGE_KEY = 'lastMessageTime';

// EmailJS credentials come from the build environment (see .env.example).
// Without them the form falls back to opening the visitor's mail app.
const EMAILJS = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
};
const emailjsConfigured = Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey);

const LINK_META = {
  Email:    { icon: 'fas fa-envelope',    label: 'Email' },
  LinkedIn: { icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
  GitHub:   { icon: 'fab fa-github',      label: 'GitHub' },
  GitLab:   { icon: 'fab fa-gitlab',      label: 'GitLab' },
  Telegram: { icon: 'fab fa-telegram',    label: 'Telegram' },
};

const readSecondsLeft = () => {
  try {
    const last = parseInt(localStorage.getItem(STORAGE_KEY), 10);
    if (!last) return 0;
    return Math.max(0, Math.ceil((last + WAIT_SECONDS * 1000 - Date.now()) / 1000));
  } catch (e) {
    return 0;
  }
};

const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

export const ContactPage = () => {
  const { basics } = resume;
  const email = basics.profiles.find((p) => p.network === 'Email');
  const formRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(readSecondsLeft);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft(readSecondsLeft()), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const markSent = () => {
    try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch (e) { /* storage blocked: no limit */ }
    setSecondsLeft(WAIT_SECONDS);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (readSecondsLeft() > 0) {
      setStatus('rate-limited');
      return;
    }

    if (!emailjsConfigured) {
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`);
      window.location.href = `${email.url}?subject=${subject}&body=${body}`;
      setStatus('mailto');
      return;
    }

    setIsSubmitting(true);
    emailjs
      .sendForm(EMAILJS.serviceId, EMAILJS.templateId, formRef.current, EMAILJS.publicKey)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        markSent();
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setStatus('error');
      })
      .finally(() => setIsSubmitting(false));
  };

  const locked = secondsLeft > 0;

  return (
    <div className="sp-page">
      <DarkSphere />
      <TopNavbar forceDark />

      <main className="ct-section">
        <h1 className="ct-title">Contact</h1>

        <div className="ct-content">
          <div className="ct-info">
            <h2 className="ct-info__title">Let's connect</h2>
            <p className="ct-info__text">
              Actively seeking co-op and cybersecurity / networking roles. Send a message
              and I'll get back to you within 24 hours.
            </p>

            {email && (
              <div className="ct-detail">
                <i className="fas fa-envelope" />
                <span>{email.username}</span>
              </div>
            )}

            <div className="ct-social">
              {basics.profiles.map((p) => {
                const meta = LINK_META[p.network];
                if (!meta) return null;
                const isEmail = p.url.startsWith('mailto');
                return (
                  <a
                    key={p.network}
                    href={p.url}
                    className="ct-social__button"
                    target={isEmail ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={meta.label}
                  >
                    <i className={meta.icon} />
                    <span>{meta.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="ct-form-wrap">
            <form className="ct-form" onSubmit={handleSubmit} ref={formRef}>
              <div className="ct-group">
                <label htmlFor="ct-name">Name</label>
                <input id="ct-name" name="name" type="text" value={formData.name} onChange={handleChange}
                  required placeholder="Your name" disabled={locked} autoComplete="name" />
              </div>

              <div className="ct-group">
                <label htmlFor="ct-email">Email</label>
                <input id="ct-email" name="email" type="email" value={formData.email} onChange={handleChange}
                  required placeholder="you@example.com" disabled={locked} autoComplete="email" />
              </div>

              <div className="ct-group">
                <label htmlFor="ct-subject">Subject</label>
                <input id="ct-subject" name="subject" type="text" value={formData.subject} onChange={handleChange}
                  required placeholder="What's this about?" disabled={locked} />
              </div>

              <div className="ct-group">
                <label htmlFor="ct-message">Message</label>
                <div className="ct-textarea">
                  <textarea id="ct-message" name="message" rows="6" value={formData.message} onChange={handleChange}
                    required placeholder="Your message" maxLength={MAX_MESSAGE} disabled={locked} />
                  <span className={`ct-counter${formData.message.length >= MAX_MESSAGE ? ' limit' : ''}`}>
                    {formData.message.length}/{MAX_MESSAGE}
                  </span>
                </div>
              </div>

              {locked ? (
                <div className="ct-status ct-status--warn">
                  Thanks! You can send another message in {formatTime(secondsLeft)}.
                </div>
              ) : (
                <button type="submit" className={`ct-submit${isSubmitting ? ' submitting' : ''}`} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Send message'}
                </button>
              )}

              {status === 'success' && <div className="ct-status ct-status--success">Message sent. I'll reply soon.</div>}
              {status === 'mailto' && <div className="ct-status ct-status--success">Opening your mail app to send this message.</div>}
              {status === 'error' && <div className="ct-status ct-status--error">Something went wrong. Please email me directly instead.</div>}
              {status === 'rate-limited' && <div className="ct-status ct-status--warn">Please wait a few minutes before sending another message.</div>}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;
