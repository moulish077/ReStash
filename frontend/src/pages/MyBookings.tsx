
import { useMemo, useState } from 'react'
import './MyBookings.css'

type BookingStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled'

type Booking = {
  id: number
  resourceName: string
  location: string
  owner: string
  startDate: string
  endDate: string
  status: BookingStatus
}

// Real booking data will be loaded here when the booking API is implemented.
const bookings: Booking[] = []

const statuses = ['All Bookings', 'Pending', 'Approved', 'Rejected', 'Cancelled']

export default function MyBookings() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All Bookings')

  const filteredBookings = useMemo(() => {
    const term = search.trim().toLowerCase()

    return bookings.filter((booking) => {
      const matchesSearch = [
        booking.resourceName,
        booking.location,
        booking.owner,
      ].some((value) => value.toLowerCase().includes(term))

      const matchesStatus =
        status === 'All Bookings' || booking.status === status

      return matchesSearch && matchesStatus
    })
  }, [search, status])

  const pendingCount = bookings.filter(
    (booking) => booking.status === 'Pending',
  ).length

  const approvedCount = bookings.filter(
    (booking) => booking.status === 'Approved',
  ).length

  const rejectedCount = bookings.filter(
    (booking) => booking.status === 'Rejected',
  ).length

  return (
    <section className="my-bookings-page">
      <header className="bookings-header">
        <div>
          <p className="bookings-eyebrow">YOUR RESTASH ACTIVITY</p>
          <h1>My Bookings</h1>
          <p className="bookings-subtitle">
            Keep track of the resources you request from your community.
          </p>
        </div>
      </header>

      <div className="bookings-stats">
        <article className="booking-stat-card">
          <span>Total bookings</span>
          <strong>{bookings.length}</strong>
        </article>
        <article className="booking-stat-card">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </article>
        <article className="booking-stat-card">
          <span>Approved</span>
          <strong>{approvedCount}</strong>
        </article>
        <article className="booking-stat-card">
          <span>Rejected</span>
          <strong>{rejectedCount}</strong>
        </article>
      </div>

      <div className="bookings-toolbar">
        <div>
          <h2>Booking history</h2>
          <p>View your requests and their current status.</p>
        </div>
      </div>

      <div className="bookings-controls">
        <div className="bookings-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search resources or locations..."
            aria-label="Search bookings"
          />
        </div>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          aria-label="Filter bookings by status"
        >
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="bookings-empty">
          <div className="bookings-empty-icon" aria-hidden="true">
            <span>▤</span>
          </div>
          <h3>
            {bookings.length === 0
              ? 'No bookings yet'
              : 'No matching bookings'}
          </h3>
          <p>
            {bookings.length === 0
              ? 'When you request a resource, your booking details and status will appear here.'
              : 'Try a different search term or select another status filter.'}
          </p>

          {bookings.length > 0 && (
            <button
              type="button"
              className="bookings-secondary-button"
              onClick={() => {
                setSearch('')
                setStatus('All Bookings')
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="bookings-list">
          {filteredBookings.map((booking) => (
            <article className="booking-card" key={booking.id}>
              <div className="booking-card-heading">
                <div>
                  <span className="booking-id">BOOKING #{booking.id}</span>
                  <h3>{booking.resourceName}</h3>
                </div>
                <span
                  className={`booking-status ${booking.status.toLowerCase()}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="booking-details">
                <p><strong>Location:</strong> {booking.location}</p>
                <p><strong>Resource owner:</strong> {booking.owner}</p>
                <p><strong>From:</strong> {booking.startDate}</p>
                <p><strong>Until:</strong> {booking.endDate}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
