/**
 * @swagger
 * /api/client/bu/booking/create:
 *   post:
 *     summary: Create a new Appointment
 *     description: Adds a new appointment with the provided details.
 *     tags:
 *       - Appointments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayId:
 *                 type: string
 *                 description: Unique identifier for the appointment display.
 *                 example: "APPT-2024-001"
 *               branchId:
 *                 type: string
 *                 description: Unique identifier for the branch.
 *                 example: "BRANCH-2024-001"
 *               buId:
 *                 type: string
 *                 description: Unique identifier for the business unit.
 *                 example: "BU-2024-001"
 *               token:
 *                 type: string
 *                 nullable: true
 *                 description: Token for the appointment. Null if not assigned.
 *                 example: null
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date and time of the appointment.
 *                 example: "2024-11-27T10:00:00Z"
 *               caseId:
 *                 type: string
 *                 nullable: true
 *                 description: Unique identifier for the associated case. Null if not applicable.
 *                 example: null
 *               dutyDoctorId:
 *                 type: string
 *                 description: Unique identifier for the duty doctor.
 *                 example: "DOCTOR-2024-002"
 *               dentalAssistant:
 *                 type: string
 *                 description: Name of the dental assistant.
 *                 example: "John Doe"
 *               slotFrom:
 *                 type: string
 *                 description: Starting time of the appointment slot.
 *                 example: "10:00"
 *               slotTo:
 *                 type: string
 *                 description: Ending time of the appointment slot.
 *                 example: "10:30"
 *               chairId:
 *                 type: string
 *                 description: Unique identifier for the chair assigned to the appointment.
 *                 example: "CHAIR-2024-005"
 *               patientId:
 *                 type: string
 *                 description: Unique identifier for the patient.
 *                 example: "PATIENT-2024-003"
 *               status:
 *                 type: string
 *                 description: Status of the appointment.
 *                 example: "Scheduled"
 *               isActive:
 *                 type: boolean
 *                 description: Indicates if the appointment is active.
 *                 example: true
 *               deletedAt:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *                 description: Timestamp for when the appointment was deleted. Null if not deleted.
 *                 example: null
 *               createdUser:
 *                 type: string
 *                 description: User who created the appointment.
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: Appointment created successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 201
 *               message: "New appointment created successfully."
 *               data:
 *                 displayId: "APPT-2024-001"
 *                 branchId: "BRANCH-2024-001"
 *                 buId: "BU-2024-001"
 *                 token: null
 *                 date: "2024-11-27T10:00:00Z"
 *                 caseId: null
 *                 dutyDoctorId: "DOCTOR-2024-002"
 *                 dentalAssistant: "John Doe"
 *                 slotFrom: "10:00"
 *                 slotTo: "10:30"
 *                 chairId: "CHAIR-2024-005"
 *                 patientId: "PATIENT-2024-003"
 *                 status: "Scheduled"
 *                 isActive: true
 *                 deletedAt: null
 *                 createdUser: "admin"
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 400
 *               message: "Invalid input data. Please check the provided details."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
