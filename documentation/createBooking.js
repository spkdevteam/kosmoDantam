/**
 * @swagger
 * /api/client/bu/booking/create:
 *   post:
 *     summary: Create a new booking
 *     description: This endpoint allows the creation of a new booking with details such as client, branch, business unit, schedule, and patient information.
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
 *                 description: Unique identifier for the client.
 *                 example: "6735e64c5c58f271b1ce1678"
 *               branchId:
 *                 type: string
 *                 description: Unique identifier for the branch.
 *                 example: "6736e43eecc4dfe280f90d03"
 *               buId:
 *                 type: string
 *                 description: Unique identifier for the business unit.
 *                 example: "673ef64bdc1355e6ca2e61eb"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time of the booking.
 *                 example: "2024-12-05T10:00:00Z"
 *               caseId:
 *                 type: string
 *                 nullable: true
 *                 description: Identifier for the associated case, if any.
 *                 example: null
 *               dutyDoctorId:
 *                 type: string
 *                 description: Identifier for the duty doctor handling the booking.
 *                 example: "674430638739bf79034a931d"
 *               dentalAssistant:
 *                 type: string
 *                 description: Identifier for the dental assistant assigned to the booking.
 *                 example: "6746f53687bafb123ffb22a5"
 *               slotFrom:
 *                 type: string
 *                 description: Start time of the booking slot.
 *                 example: "10:00"
 *               slotTo:
 *                 type: string
 *                 description: End time of the booking slot.
 *                 example: "10:30"
 *               chairId:
 *                 type: string
 *                 description: Identifier for the chair assigned for the booking.
 *                 example: "67371a9a964d59372c4336f8"
 *               patientId:
 *                 type: string
 *                 description: Identifier for the patient associated with the booking.
 *                 example: "6746c52824de581b301fddfd"
 *               status:
 *                 type: string
 *                 description: Status of the booking (e.g., Scheduled, Completed, Canceled).
 *                 example: "Scheduled"
 *               isActive:
 *                 type: boolean
 *                 description: Indicates if the booking is active.
 *                 example: true
 *               deletedAt:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *                 description: Timestamp when the booking was deleted, if applicable.
 *                 example: null
 *               createdUser:
 *                 type: string
 *                 description: Name or identifier of the user who created the booking.
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: Booking created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Status of the operation.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Booking created successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     bookingId:
 *                       type: string
 *                       description: Unique identifier of the created booking.
 *                       example: "674c6d8924de581b301fdf04"
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid request data."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "An error occurred while creating the booking."
 */
