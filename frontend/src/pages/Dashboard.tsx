import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Recycle,
  LayoutDashboard,
  Search,
  Tag,
  CalendarDays,
  MessageCircle,
  UserRound,
  Settings,
  Bell,
  Plus,
  ArrowRight,
  MapPin,
  Heart,
  Package,
  CheckCircle,
  Clock,
  Menu,
  X,
  Leaf,
} from 'lucide-react'
import './dashboard.css'

const resources = [
  {
    id: 1,
    name: 'Mountain Bike',
    category: 'Sports & Outdoors',
    location: 'Coimbatore',
    image:
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600',
  },
  {
    id: 2,
    name: 'Camping Tent',
    category: 'Camping',
    location: 'Coimbatore',
    image:
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600',
  },
  {
    id: 3,
    name: 'DSLR Camera',
    category: 'Electronics',
    location: 'Coimbatore',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600',
  },
  {
    id: 4,
    name: 'Power Drill',
    category: 'Tools & Equipment',
    location: 'Coimbatore',
    image:
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600',
  },
]

const activities = [
  {
    icon: CheckCircle,
    title: 'Welcome to ReStash!',
    description: 'Your resource-sharing journey starts here.',
    time: 'Just now',
  },
  {
    icon: Package,
    title: 'Explore available resources',
    description: 'Find useful items in your community.',
    time: 'Get started',
  },
  {
    icon: MessageCircle,
    title: 'Connect with the community',
    description: 'Share resources and help reduce waste.',
    time: 'Anytime',
  },
]

const navigation = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Browse Resources', icon: Search },
  { label: 'My Listings', icon: Tag },
  { label: 'My Bookings', icon: CalendarDays },
  { label: 'Messages', icon: MessageCircle },
  { label: 'Profile', icon: UserRound },
  { label: 'Settings', icon: Settings },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [unreadMessages] = useState(0)
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [activePage, setActivePage] = useState('Dashboard')
  const [menuOpen, setMenuOpen] = useState(false)

  const filteredResources = resources.filter((resource) =>
    `${resource.name} ${resource.category}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  
function handleNavigation(label: string) {
  setActivePage(label)
  setMenuOpen(false)

  const routes: Record<string, string> = {
    Dashboard: '/dashboard',
    'Browse Resources': '/dashboard/browse',
    'My Listings': '/dashboard/listings',
    'My Bookings': '/dashboard/bookings',
    Messages: '/dashboard/messages',
    Profile: '/dashboard/profile',
    Settings: '/dashboard/settings',
  }

  navigate(routes[label] || '/dashboard')
}


  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  return (
    <div className="dashboard-layout">
      <aside className={`dashboard-sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="dashboard-brand">
          <Recycle size={30} strokeWidth={2.5} />
          <span>ReStash</span>
          <button
            className="mobile-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={21} />
          </button>
        </div>

        <p className="sidebar-label">MENU</p>

        <nav className="sidebar-navigation">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`sidebar-link ${
                activePage === label ? 'active' : ''
              }`}
              onClick={() => handleNavigation(label)}
            >
              <Icon size={19} />
              <span>{label}</span>
              {label === 'Messages' && unreadMessages > 0 && (
  <span className="message-count">{unreadMessages}</span>
)}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-eco-icon">
            <Leaf size={27} />
          </div>
          <h3>Share more. Waste less.</h3>
          <p>Small actions make a greener community.</p>
        </div>
      </aside>

      {menuOpen && (
        <button
          className="sidebar-overlay"
          onClick={() => setMenuOpen(false)}
          aria-label="Close navigation"
        />
      )}

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={23} />
          </button>

          <div className="dashboard-search">
            <Search size={19} />
            <input
              type="search"
              placeholder="Search resources..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="topbar-profile">
            <button
              className="notification-button"
              aria-label="Notifications"
              onClick={() => window.alert('You are all caught up!')}
            >
              <Bell size={21} />
              <span />
            </button>
            <div className="profile-avatar">
              <UserRound size={22} />
            </div>
            <div className="profile-details">
              <strong>My Account</strong>
              <span>ReStash Member</span>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="welcome-banner">
            <div className="welcome-copy">
              <span className="welcome-eyebrow">YOUR COMMUNITY, YOUR RESOURCES</span>
              <h1>Welcome to ReStash! 👋</h1>
              <p>
                Share what you have, discover what you need, and make a
                difference.
              </p>
              <button
                className="primary-button"
                onClick={() => navigate('/')}
              >
                Explore Resources <ArrowRight size={17} />
              </button>
            </div>

            <div className="welcome-art">
              <div className="welcome-art-circle">
                <Leaf size={68} strokeWidth={1.4} />
              </div>
              <span>Reuse. Share. Repeat.</span>
            </div>
          </section>

          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon purple">
                <Package size={22} />
              </div>
              <p>Total Resources</p>
              <h2>12</h2>
              <span>Community resources</span>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                <CheckCircle size={22} />
              </div>
              <p>Available Resources</p>
              <h2>8</h2>
              <span>Ready to be shared</span>
            </div>

            <div className="stat-card">
              <div className="stat-icon blue">
                <CalendarDays size={22} />
              </div>
              <p>Active Bookings</p>
              <h2>3</h2>
              <span>Your current bookings</span>
            </div>

            <div className="stat-card">
              <div className="stat-icon pink">
                <Tag size={22} />
              </div>
              <p>My Listings</p>
              <h2>5</h2>
              <span>Items you've shared</span>
            </div>
          </section>

          <section className="resource-section">
            <div className="section-heading">
              <div>
                <h2>Featured Resources</h2>
                <p>Useful things shared by your community</p>
              </div>
              <button
                className="text-link"
                onClick={() => navigate('/')}
              >
                View all <ArrowRight size={16} />
              </button>
            </div>

            <div className="resource-grid">
              {filteredResources.map((resource) => (
                <article className="resource-card" key={resource.id}>
                  <div className="resource-image">
                    <img src={resource.image} alt={resource.name} />
                    <button
                      className={`favorite-button ${
                        favorites.includes(resource.id) ? 'favorited' : ''
                      }`}
                      onClick={() => toggleFavorite(resource.id)}
                      aria-label={`${
                        favorites.includes(resource.id)
                          ? 'Remove'
                          : 'Add'
                      } ${resource.name} ${'from favorites'}`}
                    >
                      <Heart
                        size={18}
                        fill={
                          favorites.includes(resource.id)
                            ? 'currentColor'
                            : 'none'
                        }
                      />
                    </button>
                  </div>

                  <div className="resource-info">
                    <span className="category-pill">{resource.category}</span>
                    <h3>{resource.name}</h3>
                    <p className="resource-location">
                      <MapPin size={15} /> {resource.location}
                    </p>
                    <p className="availability">
                      <span /> Available now
                    </p>
                    <button
                      className="resource-button"
                      onClick={() =>
                        window.alert(
                          `${resource.name} selected. Resource details can be connected next.`,
                        )
                      }
                    >
                      View Details
                    </button>
                  </div>
                </article>
              ))}

              {filteredResources.length === 0 && (
                <div className="no-resources">
                  No resources match "{search}". Try another search.
                </div>
              )}
            </div>
          </section>

          <section className="booking-preview">
            <div className="section-heading">
              <div>
                <h2>Upcoming Bookings</h2>
                <p>Keep track of your shared resources</p>
              </div>
              <Clock size={20} />
            </div>
            <div className="empty-bookings">
              <CalendarDays size={28} />
              <div>
                <strong>Your bookings will appear here</strong>
                <p>Browse resources to get started with your first booking.</p>
              </div>
              <button
                className="text-link"
                onClick={() => navigate('/')}
              >
                Browse <ArrowRight size={16} />
              </button>
            </div>
          </section>

          <footer className="dashboard-footer">
            <Leaf size={18} />
            <span>Every shared resource is a step towards a sustainable future.</span>
          </footer>
        </div>
      </main>

      <aside className="dashboard-right-panel">
        <section className="quick-actions panel-card">
          <h2>Quick Actions</h2>
          <button
            className="quick-action-primary"
            onClick={() => navigate('/?action=list')}
          >
            <Plus size={22} />
            <span>
              <strong>List a Resource</strong>
              <small>Share something with others</small>
            </span>
          </button>
          <button
            className="quick-action-secondary"
            onClick={() => navigate('/')}
          >
            <Search size={21} />
            <span>
              <strong>Browse Resources</strong>
              <small>Find something you need</small>
            </span>
          </button>
        </section>

        <section className="activity-panel panel-card">
          <div className="section-heading">
            <h2>Recent Activity</h2>
          </div>

          {activities.map(({ icon: Icon, title, description, time }) => (
            <div className="activity-item" key={title}>
              <div className="activity-icon">
                <Icon size={19} />
              </div>
              <div className="activity-copy">
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
              <span className="activity-time">{time}</span>
            </div>
          ))}
        </section>

        <section className="sustainability-card">
          <div className="sustainability-icon">
            <Leaf size={27} />
          </div>
          <h3>Small actions. Big impact.</h3>
          <p>
            By sharing and reusing resources, you're helping reduce waste
            and build a more sustainable community.
          </p>
          <div className="sustainability-decoration">
            <Leaf size={48} strokeWidth={1.1} />
          </div>
        </section>
      </aside>
    </div>
  )
}