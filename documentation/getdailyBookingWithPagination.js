/**
 * @swagger
 * /api/client/bu/booking/getdailyBookingWithPagination:
 *   get:
 *     summary: Get daily bookings with pagination
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: query
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the client
 *         example: "67602303890afbdafd0817b5"
 *       - in: query
 *         name: buId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the business unit
 *         example: "6760230a890afbdafd0818bd"
 *       - in: query
 *         name: bookingDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date of the booking in YYYY-MM-DD format
 *         example: "2024-12-01"
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *         example: 1
 *       - in: query
 *         name: perPage
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *         example: 10
 *       - in: query
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the branch
 *         example: "67602d00890afbdafd081e2b"
 *       - in: query
 *         name: keyword
 *         required: false
 *         schema:
 *           type: string
 *         description: Search keyword for filtering bookings
 *         example: "John Doe"
 *     responses:
 *       200:
 *         description: Successfully fetched daily bookings with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Daily bookings fetched successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalRecords:
 *                       type: integer
 *                       description: Total number of bookings available
 *                       example: 120
 *                     currentPage:
 *                       type: integer
 *                       description: Current page number
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       description: Total number of pages
 *                       example: 12
 *                     bookings:
 *                       type: array
 *                       description: List of bookings
 *                       items:
 *                         type: object
 *                         properties:
 *                           bookingId:
 *                             type: string
 *                             description: Unique identifier for the booking
 *                             example: "BKG123456"
 *                           clientName:
 *                             type: string
 *                             description: Name of the client
 *                             example: "John Doe"
 *                           bookingDate:
 *                             type: string
 *                             format: date
 *                             description: Date of the booking
 *                             example: "2024-12-01"
 *                           status:
 *                             type: string
 *                             description: Status of the booking
 *                             example: "Confirmed"
 *       400:
 *         description: Bad request due to invalid input parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid query parameters."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "An error occurred while fetching the bookings."
 */
