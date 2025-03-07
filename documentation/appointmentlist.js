/**
 * @swagger
 * /api/client/bu/booking/BookingByDate:
 *   get:
 *     summary: Retrieve a list of appointments.
 *     description: Fetch a list of appointments based on the client ID, business unit ID, booking date, and branch code.
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the client.
 *         example: "6735e64c5c58f271b1ce1678"
 *       - in: query
 *         name: buId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier of the business unit.
 *         example: "673ef64bdc1355e6ca2e61eb"
 *       - in: query
 *         name: bookingDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Date of the appointment bookings to retrieve (in YYYY-MM-DD format).
 *         example: "2024-11-27"
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *         required: true
 *         description: Code of the branch where appointments are booked.
 *         example: "6736e43eecc4dfe280f90d03"
 *     responses:
 *       200:
 *         description: List of appointments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Success status of the operation.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Appointments retrieved successfully."
 *                 data:
 *                   type: array
 *                   description: List of appointments.
 *                   items:
 *                     type: object
 *                     properties:
 *                       appointmentId:
 *                         type: string
 *                         description: Unique identifier for the appointment.
 *                         example: "674ff69a32612884eeb5dd27"
 *                       clientId:
 *                         type: string
 *                         description: Unique identifier of the client.
 *                         example: "6735e64c5c58f271b1ce1678"
 *                       buId:
 *                         type: string
 *                         description: Unique identifier of the business unit.
 *                         example: "bu12345"
 *                       bookingDate:
 *                         type: string
 *                         format: date
 *                         description: Date of the appointment.
 *                         example: "2024-12-10"
 *                       branchCode:
 *                         type: string
 *                         description: Code of the branch where the appointment was booked.
 *                         example: "BR123"
 *                       status:
 *                         type: string
 *                         description: Status of the appointment (e.g., Scheduled, Completed, Cancelled).
 *                         example: "Scheduled"
 *       400:
 *         description: Validation error or missing/invalid input fields.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please provide all required fields."
 *       404:
 *         description: No appointments found for the given criteria.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No appointments found for the given booking date and branch code."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
