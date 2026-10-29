
import { useEffect, useState, type FormEvent, type ChangeEvent } from 'react'
import './Profile.css'

type ProfileDetails = {
  name: string
  email: string
  phone: string
  location: string
  bio: string
  accountType: string
}

const initialProfile: ProfileDetails = {
  name: '',
  email: '',
  phone: '',
  location: '',
  bio: '',
  accountType: 'Individual',
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileDetails>(() => {
  try {
    const savedProfile = localStorage.getItem('restash-profile')

    return savedProfile
      ? { ...initialProfile, ...JSON.parse(savedProfile) }
      : initialProfile
  } catch {
    return initialProfile
  }
})

const [message, setMessage] = useState('')

useEffect(() => {
  localStorage.setItem('restash-profile', JSON.stringify(profile))
}, [profile])

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target

    setProfile((current) => ({
      ...current,
      [name]: value,
    }))

    setMessage('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()

  try {
    localStorage.setItem('restash-profile', JSON.stringify(profile))
    setMessage('Profile saved successfully!')
  } catch {
    setMessage('Could not save your profile. Please try again.')
  }
}

  const initials = profile.name.trim()
    ? profile.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('')
    : 'U'

  return (
    <section className="profile-page">
      <header className="profile-header">
        <p className="profile-eyebrow">YOUR ACCOUNT</p>
        <h1>My Profile</h1>
        <p className="profile-subtitle">
          Manage your information in the ReStash community.
        </p>
      </header>

      <div className="profile-layout">
        <aside className="profile-summary-card">
          <div className="profile-avatar">{initials}</div>

          <h2>{profile.name || 'Your Name'}</h2>
          <p className="profile-email">
            {profile.email || 'Your email address'}
          </p>

          <span className="profile-account-badge">
            {profile.accountType}
          </span>

          <hr />

          <div className="profile-summary-row">
            <span>Location</span>
            <strong>{profile.location || 'Not added'}</strong>
          </div>

          <div className="profile-summary-row">
            <span>Phone</span>
            <strong>{profile.phone || 'Not added'}</strong>
          </div>
        </aside>

        <div className="profile-form-card">
          <div className="profile-form-heading">
            <h2>Personal Information</h2>
            <p>Enter your details below.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="profile-form-grid">
              <label className="profile-field">
                <span>Full Name</span>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </label>

              <label className="profile-field">
                <span>Email Address</span>
                <input
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="profile-field">
                <span>Phone Number</span>
                <input
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </label>

              <label className="profile-field">
                <span>Location</span>
                <input
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="City, state"
                />
              </label>

              <label className="profile-field profile-field-full">
                <span>Account Type</span>
                <select
                  name="accountType"
                  value={profile.accountType}
                  onChange={handleChange}
                >
                  <option value="Individual">Individual</option>
                  <option value="Student">Student</option>
                  <option value="Institution">Institution</option>
                  <option value="Organization">Organization</option>
                  <option value="Small Business">Small Business</option>
                </select>
              </label>

              <label className="profile-field profile-field-full">
                <span>About Me</span>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="Tell the community about yourself..."
                  rows={4}
                  maxLength={300}
                />
                <small>{profile.bio.length}/300 characters</small>
              </label>
            </div>

            {message && (
              <p className="profile-feedback" role="status">
                {message}
              </p>
            )}

            <div className="profile-form-actions">
              <button
                type="button"
                className="profile-reset-button"
                onClick={() => {
                  setProfile(initialProfile)
                  setMessage('')
                }}
              >
                Clear Fields
              </button>

              <button type="submit" className="profile-save-button">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
