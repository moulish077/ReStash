
import "./BookingManagement.css";

interface Booking {
id: number;
resource: string;
owner: string;
date: string;
status: string;
}

const BookingManagement = () => {
const bookings: Booking[] = [
{
id: 1,
resource: "Engineering Books",
owner: "Arun Kumar",
date: "Oct 28, 2026",
status: "Approved",
},
{
id: 2,
resource: "Study Table",
owner: "Priya S",
date: "Oct 30, 2026",
status: "Pending",
},
{
id: 3,
resource: "Laptop Stand",
owner: "Rahul M",
date: "Nov 2, 2026",
status: "Completed",
},
];

return (
<div className="booking-management">
<div className="booking-page-heading">
<h1>Booking Management</h1>
<p>View and manage your resource bookings.</p>
</div>

  <div className="booking-management-card">
    <div className="booking-management-table-wrapper">
      <table className="booking-management-table">
        <thead>
          <tr>
            <th>Resource</th>
            <th>Owner</th>
            <th>Booking Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.resource}</td>
              <td>{booking.owner}</td>
              <td>{booking.date}</td>
              <td>
                <span
                  className={`management-status ${booking.status.toLowerCase()}`}
                >
                  {booking.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

);
};

export default BookingManagement;