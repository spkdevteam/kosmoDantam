/**
 * @swagger
 * /api/client/bu/booking/getAllbookingBypatient:
 *   get:
 *     summary: Retrieve all bookings for a patient
 *     description: Fetches all booking records for a specific patient based on client, branch, and business unit information.
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "67602303890afbdafd0817b5"
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the branch.
 *         example: "67602d00890afbdafd081e2b"
 *       - in: query
 *         name: buId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the business unit.
 *         example: "673ef64bdc1355e6ca2e61eb"
 *       - in: query
 *         name: patientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the patient.
 *         example: "676031bd9a095d01a8811fb3"
 *     responses:
 *       200:
 *         description: List of all bookings retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "All bookings retrieved successfully."
 *               data:
 *                 - appointmentId: "676231f899aa09502e811dab"
 *                   patientName: "John Doe"
 *                   appointmentDate: "2024-12-24T10:00:00Z"
 *                   status: "completed"
 *                 - appointmentId: "676231f899aa09502e811dac"
 *                   patientName: "John Doe"
 *                   appointmentDate: "2024-12-20T10:00:00Z"
 *                   status: "cancelled"
 *       400:
 *         description: Missing or invalid query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input. Please provide valid query parameters."
 *       404:
 *         description: No bookings found for the given patient.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No bookings found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
