
import { useEffect, useState, type FormEvent } from 'react'
import './Settings.css'

type SettingsData = {
  emailNotifications: boolean
  bookingUpdates: boolean
  resourceUpdates: boolean
  darkMode: boolean
  profileVisibility: boolean
  showLocation: boolean
  language: string
}

const defaultSettings: SettingsData = {
  emailNotifications: true,
  bookingUpdates: true,
  resourceUpdates: false,
  darkMode: false,
  profileVisibility: true,
  showLocation: true,
  language: 'English',
}

export default function Settings() {
  const [settings, setSettings] = useState<SettingsData>(() => {
    try {
      const saved = localStorage.getItem('restash-settings')
      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings
    } catch {
      return defaultSettings
    }
  })

  const [message, setMessage] = useState('')

  useEffect(() => {
    localStorage.setItem('restash-settings', JSON.stringify(settings))
  }, [settings])

  function updateSetting<K extends keyof SettingsData>(
    key: K,
    value: SettingsData[K],
  ) {
    setSettings((current) => ({ ...current, [key]: value }))
    setMessage('')
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      localStorage.setItem('restash-settings', JSON.stringify(settings))
      setMessage('Your settings have been saved successfully.')
    } catch {
      setMessage('Unable to save settings. Please try again.')
    }
  }

  function resetSettings() {
    setSettings({ ...defaultSettings })
    localStorage.setItem('restash-settings', JSON.stringify(defaultSettings))
    setMessage('Settings have been restored to their defaults.')
  }

  return (
    <section className="settings-page">
      <header className="settings-header">
        <p className="settings-eyebrow">PERSONALIZE YOUR EXPERIENCE</p>
        <h1>Settings</h1>
        <p>Manage your ReStash preferences, notifications, and privacy.</p>
      </header>

      <form onSubmit={handleSave}>
        <div className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-icon">⚙</div>
            <div>
              <h2>General Preferences</h2>
              <p>Choose how you prefer to use ReStash.</p>
            </div>
          </div>

          <div className="settings-field">
            <div>
              <strong>Language</strong>
              <p>Select your preferred display language.</p>
            </div>
            <select
              value={settings.language}
              onChange={(event) => updateSetting('language', event.target.value)}
            >
              <option value="English">English</option>
              <option value="Tamil">Tamil</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          <div className="settings-field">
            <div>
              <strong>Dark mode preference</strong>
              <p>Save your preference for a darker appearance.</p>
            </div>
            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={settings.darkMode}
                onChange={(event) => updateSetting('darkMode', event.target.checked)}
              />
              <span className="settings-slider" />
            </label>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-icon">♧</div>
            <div>
              <h2>Notifications</h2>
              <p>Choose which updates you want to receive.</p>
            </div>
          </div>

          <div className="settings-field">
            <div>
              <strong>Email notifications</strong>
              <p>Preference for receiving updates by email.</p>
            </div>
            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(event) => updateSetting('emailNotifications', event.target.checked)}
              />
              <span className="settings-slider" />
            </label>
          </div>

          <div className="settings-field">
            <div>
              <strong>Booking updates</strong>
              <p>Updates about booking requests and status.</p>
            </div>
            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={settings.bookingUpdates}
                onChange={(event) => updateSetting('bookingUpdates', event.target.checked)}
              />
              <span className="settings-slider" />
            </label>
          </div>

          <div className="settings-field">
            <div>
              <strong>Resource updates</strong>
              <p>Updates about resources in your community.</p>
            </div>
            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={settings.resourceUpdates}
                onChange={(event) => updateSetting('resourceUpdates', event.target.checked)}
              />
              <span className="settings-slider" />
            </label>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card-heading">
            <div className="settings-icon">♙</div>
            <div>
              <h2>Privacy</h2>
              <p>Control which details you prefer to share.</p>
            </div>
          </div>

          <div className="settings-field">
            <div>
              <strong>Profile visibility preference</strong>
              <p>Choose whether you want your profile to be visible.</p>
            </div>
            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={settings.profileVisibility}
                onChange={(event) => updateSetting('profileVisibility', event.target.checked)}
              />
              <span className="settings-slider" />
            </label>
          </div>

          <div className="settings-field">
            <div>
              <strong>Show location preference</strong>
              <p>Choose whether you want to share your location.</p>
            </div>
            <label className="settings-toggle">
              <input
                type="checkbox"
                checked={settings.showLocation}
                onChange={(event) => updateSetting('showLocation', event.target.checked)}
              />
              <span className="settings-slider" />
            </label>
          </div>
        </div>

        {message && (
          <p className="settings-feedback" role="status">
            {message}
          </p>
        )}

        <div className="settings-actions">
          <button type="button" className="settings-reset-button" onClick={resetSettings}>
            Reset Defaults
          </button>
          <button type="submit" className="settings-save-button">
            Save Settings
          </button>
        </div>
      </form>
    </section>
  )
}
