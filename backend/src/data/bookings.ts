
export type Booking = {
  id: number
  resourceId: number
  resourceName: string
  requester: string
  owner: string
  startDate: string
  endDate: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled'
  createdAt: string
}

const bookings: Booking[] = []
module.exports = { bookings }
