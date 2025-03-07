/**
 * @swagger
 * /api/client/bu/booking/changeAppointmentStatus:
 *   post:
 *     summary: Change the status of an appointment
 *     description: Updates the status of a specific appointment for a client in a specific branch and business unit.
 *     tags:
 *       - Appointments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: Unique identifier of the client.
 *                 example: "6478a6d1b34f5d3a44e8b123"
 *               branchId:
 *                 type: string
 *                 description: Unique identifier of the branch.
 *                 example: "6478b9c5e7f6f4d9b3c4f321"
 *               buId:
 *                 type: string
 *                 description: Unique identifier of the business unit.
 *                 example: "6478c123a7e4d2b2e5f7a987"
 *               appointmentId:
 *                 type: string
 *                 description: Unique identifier of the appointment.
 *                 example: "6478d567e3f2b1c1f4a1c456"
 *               status:
 *                 type: string
 *                 description: New status for the appointment.
 *                 enum: 
 *                   - Scheduled
 *                   - Rescheduled
 *                   - Cancelled
 *                   - Completed
 *                 example: "Cancelled"
 *     responses:
 *       200:
 *         description: Successfully updated the appointment status.
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
 *                   example: "Appointment status updated successfully."
 *       400:
 *         description: Invalid input or missing required fields.
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
 *                   example: "Invalid appointmentId or status."
 *       404:
 *         description: Appointment or client not found.
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
 *                   example: "Appointment not found."
 *       500:
 *         description: Internal server error.
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
 *                   example: "An unexpected error occurred."
 */
