
import { useEffect, useMemo, useState } from 'react'
import { getResources, type Resource } from '../api'
import './BrowseResources.css'

const categories = [
  'All Categories',
  'Electronics',
  'Sports & Outdoors',
  'Tools',
  'Books',
  'Lab Equipment',
  'Other',
]

export default function BrowseResources() {
  const [resources, setResources] = useState<Resource[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [availability, setAvailability] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadResources() {
    setLoading(true)
    setError('')

    try {
      const data = await getResources()
      setResources(data)
    } catch {
      setError(
        'Unable to load resources. Please check that your backend is running.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadResources()
  }, [])

  const filteredResources = useMemo(() => {
    const term = search.trim().toLowerCase()

    return resources.filter((resource) => {
      const matchesSearch = [
        resource.name,
        resource.description,
        resource.category,
        resource.location,
        resource.owner,
      ].some((value) => value.toLowerCase().includes(term))

      const matchesCategory =
        category === 'All Categories' ||
        resource.category.toLowerCase() === category.toLowerCase()

      const matchesAvailability =
        availability === 'All' ||
        (availability === 'Available' && resource.available) ||
        (availability === 'Unavailable' && !resource.available)

      return matchesSearch && matchesCategory && matchesAvailability
    })
  }, [resources, search, category, availability])

  return (
    <section className="browse-page">
      <header className="browse-header">
        <div>
          <p className="browse-eyebrow">RESTASH MARKETPLACE</p>
          <h1>Browse Resources</h1>
          <p className="browse-subtitle">
            Discover useful resources shared by your community.
          </p>
        </div>

        <button
          className="browse-refresh"
          type="button"
          onClick={() => void loadResources()}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </header>

      <div className="browse-search">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          placeholder="Search resources, categories or locations..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search resources"
        />
      </div>

      <div className="browse-filters">
        <label>
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          Availability
          <select
            value={availability}
            onChange={(event) => setAvailability(event.target.value)}
          >
            <option value="All">All resources</option>
            <option value="Available">Available only</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </label>
      </div>

      <div className="browse-results-heading">
        <h2>Community Resources</h2>
        {!loading && (
          <span>
            {filteredResources.length}{' '}
            {filteredResources.length === 1 ? 'resource' : 'resources'}
          </span>
        )}
      </div>

      {loading ? (
        <p className="browse-message">Loading resources...</p>
      ) : error ? (
        <div className="browse-message browse-error">
          <p>{error}</p>
          <button type="button" onClick={() => void loadResources()}>
            Try again
          </button>
        </div>
      ) : filteredResources.length === 0 ? (
        <div className="browse-empty">
          <h3>No resources found</h3>
          <p>Try another search or change your filters.</p>
          <button
            type="button"
            onClick={() => {
              setSearch('')
              setCategory('All Categories')
              setAvailability('All')
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="browse-grid">
          {filteredResources.map((resource) => (
            <article className="browse-card" key={resource.id}>
              <div className="browse-card-top">
                <span className="browse-category">
                  {resource.category}
                </span>
                <span
                  className={
                    resource.available
                      ? 'browse-status available'
                      : 'browse-status unavailable'
                  }
                >
                  {resource.available ? 'Available' : 'Unavailable'}
                </span>
              </div>

              <h3>{resource.name}</h3>
              <p className="browse-description">
                {resource.description}
              </p>

              <div className="browse-card-details">
                <p>
                  <strong>Location:</strong> {resource.location}
                </p>
                <p>
                  <strong>Shared by:</strong> {resource.owner}
                </p>
              </div>

              <button
                className="browse-card-button"
                type="button"
                disabled={!resource.available}
                onClick={(e) => {
  const button = e.currentTarget
  button.textContent = 'Request Sent ✓'
  button.disabled = true
}}
              >
                {resource.available ? 'Request Resource' : 'Not Available'}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
