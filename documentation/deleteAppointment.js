/**
 * @swagger
 * /api/client/bu/booking/delete:
 *   delete:
 *     summary: Delete a booking
 *     description: Deletes a specific booking for a given client, branch, and business unit using the provided appointment ID.
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
 *         name: appointmentid
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the appointment to be deleted.
 *         example: "676231f899aa09502e811dab"
 *     responses:
 *       200:
 *         description: Booking deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Booking deleted successfully."
 *       400:
 *         description: Missing or invalid query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input. Please provide valid query parameters."
 *       404:
 *         description: Booking not found for the given appointment ID.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Booking not found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
