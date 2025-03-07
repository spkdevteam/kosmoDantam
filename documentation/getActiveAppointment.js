/**
 * @swagger
 * /api/client/bu/booking/getActiveAppointment:
 *   get:
 *     summary: Retrieve active appointments for a patient
 *     description: Fetches active appointments based on client, branch, business unit, and patient information.
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
 *         description: List of active appointments retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Active appointments retrieved successfully."
 *               data:
 *                 - appointmentId: "676231f899aa09502e811dab"
 *                   patientName: "John Doe"
 *                   appointmentDate: "2024-12-24T10:00:00Z"
 *                   status: "active"
 *       400:
 *         description: Missing or invalid query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input. Please provide valid query parameters."
 *       404:
 *         description: No active appointments found for the given criteria.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No active appointments found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
