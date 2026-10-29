
import { useEffect, useMemo, useState } from 'react'
import { createResource, getResources, type Resource } from '../api'
import './MyListings.css'

const categories = [
  'Electronics',
  'Sports & Outdoors',
  'Tools',
  'Books',
  'Lab Equipment',
  'Other',
]

export default function MyListings() {
  const [resources, setResources] = useState<Resource[]>([])
  const [owner, setOwner] = useState('')
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [location, setLocation] = useState('')

  async function loadResources() {
    setLoading(true)
    setError('')

    try {
      const data = await getResources()
      setResources(data)
    } catch {
      setError('Could not load listings. Check that your backend is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadResources()
  }, [])

  const myResources = useMemo(() => {
    const term = search.trim().toLowerCase()

    return resources.filter((resource) => {
      const matchesOwner =
        owner.trim() !== '' &&
        resource.owner.toLowerCase() === owner.trim().toLowerCase()

      const matchesSearch = [
        resource.name,
        resource.description,
        resource.category,
        resource.location,
      ].some((value) => value.toLowerCase().includes(term))

      return matchesOwner && matchesSearch
    })
  }, [resources, owner, search])

  const availableCount = myResources.filter(
    (resource) => resource.available,
  ).length

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!owner.trim()) {
      setError('Enter your email to identify your listings.')
      return
    }

    setSaving(true)

    try {
      const created = await createResource({
        name: name.trim(),
        description: description.trim(),
        category,
        location: location.trim(),
        owner: owner.trim(),
      })

      setResources((current) => [...current, created])
      setSearch('')
      setName('')
      setDescription('')
      setCategory(categories[0])
      setLocation('')
      setShowForm(false)
      setSuccess('Your resource was added successfully.')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not add your resource. Please try again.',
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="listings-page">
      <header className="listings-header">
        <div>
          <p className="listings-eyebrow">YOUR RESTASH SPACE</p>
          <h1>My Listings</h1>
          <p className="listings-subtitle">
            Manage the resources you share with your community.
          </p>
        </div>

        <button
          className="listings-primary-button"
          type="button"
          onClick={() => {
            setShowForm((current) => !current)
            setError('')
            setSuccess('')
          }}
        >
          {showForm ? 'Cancel' : '+ Add Resource'}
        </button>
      </header>

      <div className="listings-owner">
        <label htmlFor="listing-owner">Your email</label>
        <input
          id="listing-owner"
          type="email"
          placeholder="Enter the email used for your listings"
          value={owner}
          onChange={(event) => setOwner(event.target.value)}
        />
        <p>Enter the same email you used when creating a resource.</p>
      </div>

      {error && (
        <div className="listings-alert error" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="listings-alert success" role="status">
          {success}
        </div>
      )}

      {showForm && (
        <form className="listings-form" onSubmit={handleSubmit}>
          <div className="listings-form-heading">
            <h2>Share a resource</h2>
            <p>Fill in the details so others know what you are offering.</p>
          </div>

          <label htmlFor="resource-name">Resource name *</label>
          <input
            id="resource-name"
            required
            minLength={2}
            maxLength={100}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. DSLR Camera"
          />

          <label htmlFor="resource-description">Description *</label>
          <textarea
            id="resource-description"
            required
            minLength={5}
            maxLength={1000}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe the resource and how it can be used"
            rows={4}
          />

          <label htmlFor="resource-category">Category *</label>
          <select
            id="resource-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <label htmlFor="resource-location">Location *</label>
          <input
            id="resource-location"
            required
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="e.g. Coimbatore"
          />

          <div className="listings-form-actions">
            <button
              className="listings-secondary-button"
              type="button"
              onClick={() => setShowForm(false)}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              className="listings-primary-button"
              type="submit"
              disabled={saving}
            >
              {saving ? 'Adding resource...' : 'Publish Resource'}
            </button>
          </div>
        </form>
      )}

      <div className="listings-stats">
        <article className="listings-stat-card">
          <span>Total listings</span>
          <strong>{myResources.length}</strong>
        </article>
        <article className="listings-stat-card">
          <span>Available</span>
          <strong>{availableCount}</strong>
        </article>
        <article className="listings-stat-card">
          <span>Unavailable</span>
          <strong>{myResources.length - availableCount}</strong>
        </article>
      </div>

      <div className="listings-toolbar">
        <div>
          <h2>Your resources</h2>
          <p>Review the resources associated with your email.</p>
        </div>

        <button
          className="listings-secondary-button"
          type="button"
          onClick={() => void loadResources()}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      <div className="listings-search">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          placeholder="Search your listings..."
          aria-label="Search your listings"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading ? (
        <p className="listings-empty">Loading your listings...</p>
      ) : !owner.trim() ? (
        <div className="listings-empty">
          <h3>Find your listings</h3>
          <p>Enter your email above to view resources associated with it.</p>
        </div>
      ) : myResources.length === 0 ? (
        <div className="listings-empty">
          <h3>No matching listings yet</h3>
          <p>
            Try another search, check your email, or add your first resource.
          </p>
          <button
            className="listings-primary-button"
            type="button"
            onClick={() => setShowForm(true)}
          >
            + Add your first resource
          </button>
        </div>
      ) : (
        <div className="listings-grid">
          {myResources.map((resource) => (
            <article className="listing-card" key={resource.id}>
              <div className="listing-card-top">
                <span className="listing-category">
                  {resource.category}
                </span>
                <span
                  className={
                    resource.available
                      ? 'listing-status available'
                      : 'listing-status unavailable'
                  }
                >
                  {resource.available ? 'Available' : 'Unavailable'}
                </span>
              </div>

              <h3>{resource.name}</h3>
              <p className="listing-description">{resource.description}</p>

              <div className="listing-location">
                <span aria-hidden="true">⌖</span>
                {resource.location}
              </div>

              <div className="listing-card-footer">
                <span>Listing #{resource.id}</span>
                <span>Shared by you</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
