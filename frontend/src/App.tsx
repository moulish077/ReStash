import { useState } from 'react'
import {
  Recycle,
  Search,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Laptop,
  Camera,
  Tent,
  Wrench,
  Armchair,
  Menu,
  X,
  Plus,
  User,
  Lock,
  Mail,
  CheckCircle,
} from 'lucide-react'
import './App.css'

const resources = [
  {
    id: 1,
    name: 'MacBook Pro 14"',
    category: 'Electronics',
    location: 'Salem, Tamil Nadu',
    price: 500,
    description: 'A powerful laptop for development and creative projects.',
    icon: Laptop,
    color: 'blue',
  },
  {
    id: 2,
    name: 'Canon DSLR Camera',
    category: 'Photography',
    location: 'Chennai, Tamil Nadu',
    price: 350,
    description: 'Capture beautiful moments with professional-quality photos.',
    icon: Camera,
    color: 'peach',
  },
  {
    id: 3,
    name: 'Camping Tent',
    category: 'Outdoor',
    location: 'Coimbatore, Tamil Nadu',
    price: 200,
    description: 'Everything you need for a comfortable outdoor adventure.',
    icon: Tent,
    color: 'green',
  },
  {
    id: 4,
    name: 'Power Tool Kit',
    category: 'Tools',
    location: 'Salem, Tamil Nadu',
    price: 150,
    description: 'A practical toolkit for repairs and weekend DIY projects.',
    icon: Wrench,
    color: 'yellow',
  },
]

const categories = [
  { name: 'All', icon: Recycle },
  { name: 'Electronics', icon: Laptop },
  { name: 'Photography', icon: Camera },
  { name: 'Tools', icon: Wrench },
  { name: 'Outdoor', icon: Tent },
  { name: 'Spaces', icon: Armchair },
]

type ModalType = 'login' | 'signup' | 'listing' | null

function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [modal, setModal] = useState<ModalType>(null)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [notice, setNotice] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const filteredResources = resources.filter((item) => {
    const matchesSearch =
      `${item.name} ${item.category} ${item.location}`
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchesCategory =
      category === 'All' ||
      item.category === category

    return matchesSearch && matchesCategory
  })

  function showNotice(message: string) {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 3500)
  }

  function closeModal() {
    setModal(null)
    setEmail('')
    setPassword('')
    setSubmitting(false)
  }

  function handleAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)

    // The frontend form works, but authentication requires a backend.
    window.setTimeout(() => {
      setSubmitting(false)
      closeModal()
      showNotice(
        'Your form is working! Connect the backend to enable account access.',
      )
    }, 600)
  }

  function handleListing(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    closeModal()
    showNotice(
      'Listing form submitted. Connect the backend to save your resource.',
    )
  }

  return (
    <div className="app">
      <header className="navbar">
        <a href="#home" className="brand">
          <span className="brand-icon">
            <Recycle size={25} />
          </span>
          <span>
            re<span className="brand-green">stash</span>
          </span>
        </a>

        <button
          className="mobile-toggle"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle navigation"
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>

        <nav className={`nav-links ${mobileMenu ? 'nav-open' : ''}`}>
          <a href="#home" onClick={() => setMobileMenu(false)}>
            Home
          </a>
          <a href="#explore" onClick={() => setMobileMenu(false)}>
            Explore
          </a>
          <a href="#categories" onClick={() => setMobileMenu(false)}>
            Categories
          </a>

          <button
            className="login-btn"
            onClick={() => {
              setModal('login')
              setMobileMenu(false)
            }}
          >
            Log in
          </button>

          <button
            className="signup-btn"
            onClick={() => {
              setModal('signup')
              setMobileMenu(false)
            }}
          >
            Get started <ArrowUpRight size={16} />
          </button>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="status-dot" />
              THE SMARTER WAY TO SHARE
            </div>

            <h1>
              Your next great find
              <br />
              is already <span>out there.</span>
            </h1>

            <p className="hero-description">
              Why buy when you can borrow? Discover equipment, tools,
              and spaces shared by your community. Save money,
              reduce waste, and make more happen together.
            </p>

            <div className="hero-buttons">
              <a href="#explore" className="primary-btn">
                Explore resources <ArrowRight size={18} />
              </a>

              <button
                className="secondary-btn"
                onClick={() => setModal('listing')}
              >
                <Plus size={18} /> List your resource
              </button>
            </div>

            <div className="community-proof">
              <div className="avatar-stack">
                <span>R</span>
                <span>A</span>
                <span>S</span>
              </div>

              <div>
                <strong>Share more. Waste less.</strong>
                <p>Built for resourceful communities.</p>
              </div>
            </div>
          </div>

          <div className="hero-art">
            <div className="art-circle circle-a" />
            <div className="art-circle circle-b" />

            <div className="art-card art-card-top">
              <div className="art-card-icon">
                <Recycle size={23} />
              </div>
              <div>
                <strong>Give things a second life</strong>
                <p>Share what you already own</p>
              </div>
            </div>

            <div className="art-main">
              <div className="art-main-inner">
                <Recycle size={105} strokeWidth={1.15} />
                <span>SHARE • REUSE • REPEAT</span>
              </div>
            </div>

            <div className="art-card art-card-bottom">
              <div className="art-card-icon location-icon">
                <MapPin size={23} />
              </div>
              <div>
                <strong>Right around you</strong>
                <p>Discover your local community</p>
              </div>
            </div>
          </div>

          <div className="hero-footer">
            <span>ACCESS OVER OWNERSHIP</span>
            <span className="footer-line" />
            <span>BETTER TOGETHER</span>
          </div>
        </section>

        <section className="stats">
          <div className="stat-item">
            <strong>04+</strong>
            <span>Sample resources</span>
          </div>
          <div className="stat-item">
            <strong>05</strong>
            <span>Categories</span>
          </div>
          <div className="stat-item">
            <strong>01</strong>
            <span>Shared community</span>
          </div>
          <div className="stat-item">
            <strong>∞</strong>
            <span>Ways to reuse</span>
          </div>
        </section>

        <section className="explore-section" id="explore">
          <div className="section-heading">
            <div>
              <span className="section-label">FIND YOUR NEXT ESSENTIAL</span>
              <h2>What do you need today?</h2>
              <p>
                Find useful things nearby without having to buy them.
              </p>
            </div>

            <span className="result-count">
              {filteredResources.length} resources available
            </span>
          </div>

          <div className="search-bar">
            <Search size={22} />

            <input
              type="search"
              placeholder="Search laptops, cameras, tools..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search resources"
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}

            <button
              className="search-btn"
              onClick={() =>
                document
                  .getElementById('resource-list')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Search <ArrowRight size={17} />
            </button>
          </div>
        </section>

        <section className="category-section" id="categories">
          <div className="section-heading">
            <div>
              <span className="section-label">EXPLORE YOUR OPTIONS</span>
              <h2>Browse by category</h2>
            </div>
          </div>

          <div className="category-grid">
            {categories.map(({ name, icon: Icon }) => (
              <button
                key={name}
                className={`category-card ${
                  category === name ? 'category-selected' : ''
                }`}
                onClick={() => setCategory(name)}
              >
                <span className="category-icon">
                  <Icon size={23} />
                </span>
                <span>{name === 'All' ? 'All resources' : name}</span>
                <ArrowUpRight size={16} className="category-arrow" />
              </button>
            ))}
          </div>
        </section>

        <section className="resources-section" id="resource-list">
          <div className="section-heading">
            <div>
              <span className="section-label">GOOD FINDS, GREAT VALUE</span>
              <h2>
                Featured resources<span className="green-period">.</span>
              </h2>
              <p>Useful things, shared by people near you.</p>
            </div>

            <button
              className="clear-filters"
              onClick={() => {
                setCategory('All')
                setSearch('')
              }}
            >
              Clear filters <X size={16} />
            </button>
          </div>

          {filteredResources.length > 0 ? (
            <div className="resource-grid">
              {filteredResources.map((resource) => {
                const Icon = resource.icon

                return (
                  <article className="resource-card" key={resource.id}>
                    <div
                      className={`resource-visual ${resource.color}`}
                    >
                      <span className="resource-tag">
                        {resource.category}
                      </span>

                      <Icon size={76} strokeWidth={1.2} />

                      <span className="resource-number">
                        0{resource.id}
                      </span>
                    </div>

                    <div className="resource-content">
                      <div className="resource-location">
                        <MapPin size={14} />
                        {resource.location}
                      </div>

                      <h3>{resource.name}</h3>

                      <p className="resource-description">
                        {resource.description}
                      </p>

                      <div className="resource-bottom">
                        <div className="resource-price">
                          ₹{resource.price.toLocaleString('en-IN')}
                          <span> / day</span>
                        </div>

                        <button
                          className="resource-view"
                          aria-label={`View ${resource.name}`}
                          onClick={() =>
                            showNotice(
                              'Resource details and booking will be available when connected to the backend.',
                            )
                          }
                        >
                          <ArrowUpRight size={20} />
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={35} />
              <h3>No resources found</h3>
              <p>
                Try a different search or choose another category.
              </p>

              <button
                className="primary-btn"
                onClick={() => {
                  setSearch('')
                  setCategory('All')
                }}
              >
                Show all resources <ArrowRight size={17} />
              </button>
            </div>
          )}

          <p className="demo-message">
            <CheckCircle size={15} />
            Sample listings for the ReStash frontend demo.
          </p>
        </section>

        <section className="cta-section">
          <div className="cta-icon">
            <Recycle size={32} />
          </div>

          <div className="cta-content">
            <span className="section-label">HAVE SOMETHING TO SHARE?</span>
            <h2>Your unused could be someone else's useful.</h2>
            <p>
              Share your equipment or space and help your community
              do more with less.
            </p>
          </div>

          <button
            className="cta-button"
            onClick={() => setModal('listing')}
          >
            List a resource <ArrowRight size={18} />
          </button>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#home" className="brand">
          <span className="brand-icon">
            <Recycle size={24} />
          </span>
          <span>
            re<span className="brand-green">stash</span>
          </span>
        </a>

        <p>Share resources. Build community. Waste less.</p>

        <span className="copyright">
          © 2026 ReStash. Made for a more resourceful world.
        </span>
      </footer>

      {modal && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal()
            }
          }}
        >
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              className="modal-close"
              onClick={closeModal}
              aria-label="Close dialog"
            >
              <X size={21} />
            </button>

            <div className="modal-logo">
              <Recycle size={29} />
            </div>

            {modal === 'listing' ? (
              <>
                <h2 id="modal-title">List your resource</h2>
                <p className="modal-subtitle">
                  Give your unused items a second life.
                </p>

                <form
                  className="modal-form"
                  onSubmit={handleListing}
                >
                  <label htmlFor="resource-name">Resource name</label>
                  <input
                    id="resource-name"
                    placeholder="e.g. Laptop, camera, tent"
                    required
                  />

                  <label htmlFor="resource-category">Category</label>
                  <select id="resource-category" required defaultValue="">
                    <option value="" disabled>
                      Choose a category
                    </option>
                    <option>Electronics</option>
                    <option>Photography</option>
                    <option>Tools</option>
                    <option>Outdoor</option>
                    <option>Spaces</option>
                  </select>

                  <label htmlFor="resource-price">
                    Price per day (₹)
                  </label>
                  <input
                    id="resource-price"
                    type="number"
                    min="0"
                    placeholder="e.g. 250"
                    required
                  />

                  <button type="submit" className="modal-submit">
                    Submit listing <ArrowRight size={17} />
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 id="modal-title">
                  {modal === 'login'
                    ? 'Welcome back!'
                    : 'Join the community'}
                </h2>

                <p className="modal-subtitle">
                  {modal === 'login'
                    ? 'Log in to continue to ReStash.'
                    : 'Create an account and start sharing.'}
                </p>

                <form className="modal-form" onSubmit={handleAuth}>
                  <label htmlFor="email">Email address</label>

                  <div className="input-with-icon">
                    <Mail size={18} />
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>

                  <label htmlFor="password">Password</label>

                  <div className="input-with-icon">
                    <Lock size={18} />
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      autoComplete={
                        modal === 'login'
                          ? 'current-password'
                          : 'new-password'
                      }
                      minLength={6}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="modal-submit"
                    disabled={submitting}
                  >
                    {submitting
                      ? 'Please wait...'
                      : modal === 'login'
                        ? 'Log in'
                        : 'Create account'}

                    {!submitting && <ArrowRight size={17} />}
                  </button>
                </form>

                <div className="modal-switch">
                  {modal === 'login'
                    ? "Don't have an account?"
                    : 'Already have an account?'}

                  <button
                    onClick={() => {
                      setEmail('')
                      setPassword('')
                      setModal(
                        modal === 'login' ? 'signup' : 'login',
                      )
                    }}
                  >
                    {modal === 'login' ? 'Sign up' : 'Log in'}
                  </button>
                </div>
              </>
            )}

            <div className="modal-security">
              <User size={15} />
              Your community starts here.
            </div>
          </div>
        </div>
      )}

      {notice && (
        <div className="toast" role="status">
          <CheckCircle size={20} />
          <span>{notice}</span>
          <button
            onClick={() => setNotice('')}
            aria-label="Dismiss notification"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  )
}

export default App