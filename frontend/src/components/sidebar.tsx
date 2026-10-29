
import { NavLink } from 'react-router-dom'

const links = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Browse Resources', path: '/dashboard/browse' },
  { label: 'My Listings', path: '/dashboard/listings' },
  { label: 'My Bookings', path: '/dashboard/bookings' },
  { label: 'Messages', path: '/dashboard/messages' },
  { label: 'Profile', path: '/dashboard/profile' },
  { label: 'Settings', path: '/dashboard/settings' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>ReStash</h2>
      <nav>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? 'sidebar-link active' : 'sidebar-link'
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
