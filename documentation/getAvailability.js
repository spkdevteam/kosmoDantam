/**
 * @swagger
 * /api/client/bu/booking/getAvailability:
 *   get:
 *     summary: Get booking availability
 *     description: Fetches the availability of a specific chair or resource for bookings based on the provided criteria.
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "6735e64c5c58f271b1ce1678"
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the branch.
 *         example: "6736e43eecc4dfe280f90d03"
 *       - in: query
 *         name: buId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the business unit.
 *         example: "673ef64bdc1355e6ca2e61eb"
 *       - in: query
 *         name: chairId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the chair. Optional if checking general availability.
 *         example: "67371a9a964d59372c4336f8"
 *       - in: query
 *         name: startTime
 *         schema:
 *           type: string
 *           format: time
 *         required: true
 *         description: Start time of the booking period in HH:mm format.
 *         example: "10:00"
 *       - in: query
 *         name: endTime
 *         schema:
 *           type: string
 *           format: time
 *         required: true
 *         description: End time of the booking period in HH:mm format.
 *         example: "11:00"
 *       - in: query
 *         name: bookingDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Date for which availability is being checked.
 *         example: "2024-12-08"
 *       - in: query
 *         name: doctorId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the doctor. Optional for general availability.
 *         example: "6735e64d5c58f271b1ce168c"
 *       - in: query
 *         name: dentalAssistantId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the dental assistant. Optional for general availability.
 *         example: "6746f53687bafb123ffb22a5"
 *     responses:
 *       200:
 *         description: Availability details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Availability details retrieved successfully."
 *               data:
 *                 available: true
 *                 details:
 *                   chairId: "CHAIR-2024-005"
 *                   doctorId: "DOCTOR-2024-002"
 *                   dentalAssistantId: "DA-2024-003"
 *                   startTime: "10:00"
 *                   endTime: "11:00"
 *                   bookDate: "2024-11-27"
 *                   buId: "673ef64bdc1355e6ca2e61eb"
 *       400:
 *         description: Missing or invalid input parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 400
 *               message: "Invalid input data. Please check the query parameters."
 *       404:
 *         description: No availability found for the given criteria.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 404
 *               message: "No availability found for the specified chair, doctor, or dental assistant."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
