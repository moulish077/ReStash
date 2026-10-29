
import "./RecentBookings.css";

interface Booking {
id: number;
resource: string;
requester: string;
date: string;
status: string;
}

const RecentBookings = () => {
const bookings: Booking[] = [
{
id: 1,
resource: "Engineering Books",
requester: "Arun Kumar",
date: "Oct 28, 2026",
status: "Approved",
},
{
id: 2,
resource: "Study Table",
requester: "Priya S",
date: "Oct 27, 2026",
status: "Pending",
},
{
id: 3,
resource: "Laptop Stand",
requester: "Rahul M",
date: "Oct 26, 2026",
status: "Completed",
},
];

return (
<section className="recent-bookings">
<div className="recent-bookings-header">
<h2>Recent Bookings</h2>
<button type="button">View All</button>
</div>

  <div className="bookings-table-wrapper">
    <table className="bookings-table">
      <thead>
        <tr>
          <th>Resource</th>
          <th>Requester</th>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.id}>
            <td>{booking.resource}</td>
            <td>{booking.requester}</td>
            <td>{booking.date}</td>
            <td>
              <span
                className={`booking-status ${booking.status.toLowerCase()}`}
              >
                {booking.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

);
};

export default RecentBookings;