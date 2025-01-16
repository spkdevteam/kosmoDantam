/**
 * @swagger
 * /api/client/bu/booking/getBookingSummaryByPeriod:
 *   get:
 *     summary: Get booking summary by period
 *     description: Fetches a summary of bookings within a specified period for a specific client and branch.
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         example: "6735e64c5c58f271b1ce1678"
 *         description: Unique identifier of the client.
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *           example: "8974f63b4d52a341b3g92z78"
 *         description: Unique identifier of the branch.
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         example: "2025-01-01"
 *         description: Start date for the booking summary (in YYYY-MM-DD format).
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         example: "2025-01-07"
 *         description: End date for the booking summary (in YYYY-MM-DD format).
 *     responses:
 *       200:
 *         description: Booking data fetched successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Booking data fetched successfully."
 *               data:
 *                 - date: "2025-01-01"
 *                   slotFrom: "00:00"
 *                   slotTo: "00:59"
 *                   booking: 10
 *                   availableDoc: 5
 *                   availableChair: 10
 *                 - date: "2025-01-01"
 *                   slotFrom: "01:00"
 *                   slotTo: "01:59"
 *                   booking: 8
 *                   availableDoc: 4
 *                   availableChair: 9
 *       400:
 *         description: Missing or invalid parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input. Please check the query parameters."
 *       404:
 *         description: No booking data found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No booking data found for the given period."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
