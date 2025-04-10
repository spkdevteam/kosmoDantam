/**
 * @swagger
 * /api/client/bu/booking/getAppointmentWithFilter:
 *   get:
 *     summary: Get appointments with filters
 *     description: Retrieve a list of appointments filtered by various optional parameters such as date, doctor, and patient details.
 *     tags:
 *       - Appointments
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         example: "6782084da840f3a7bf1a2f72"
 *         description: Unique identifier of the client.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           example: 1
 *         description: Page number for pagination (default is 1).
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 2
 *         description: Number of items per page (default is 10).
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *           example: ""
 *         description: Start date for filtering appointments.
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *           example: ""
 *         description: End date for filtering appointments.
 *       - in: query
 *         name: createdUser
 *         schema:
 *           type: string
 *           example: ""
 *         description: User who created the appointment.
 *       - in: query
 *         name: updatedUser
 *         schema:
 *           type: string
 *           example: ""
 *         description: User who last updated the appointment.
 *       - in: query
 *         name: businessUnit
 *         schema:
 *           type: string
 *           example: ""
 *         description: Business unit identifier.
 *       - in: query
 *         name: searchKey
 *         schema:
 *           type: string
 *           example: ""
 *         description: Keyword to search appointments by a specific case, chief complaint, etc.
 *       - in: query
 *         name: caseId
 *         schema:
 *           type: string
 *           example: ""
 *         description: Unique case identifier.
 *       - in: query
 *         name: caseSheetId
 *         schema:
 *           type: string
 *           example: ""
 *         description: Case sheet identifier.
 *       - in: query
 *         name: dutyDoctorId
 *         schema:
 *           type: string
 *           example: ""
 *         description: ID of the duty doctor.
 *       - in: query
 *         name: specialistDoctorId
 *         schema:
 *           type: string
 *           example: ""
 *         description: ID of the specialist doctor (optional).
 *       - in: query
 *         name: appointmentId
 *         schema:
 *           type: string
 *           example: ""
 *         description: ID of the appointment (optional).
 *       - in: query
 *         name: dentalAssistant
 *         schema:
 *           type: string
 *           example: ""
 *         description: ID of the dental assistant.
 *       - in: query
 *         name: patientId
 *         schema:
 *           type: string
 *           example: ""
 *         description: Patient identifier.
 *       - in: query
 *         name: chairId
 *         schema:
 *           type: string
 *           example: ""
 *         description: Chair identifier for the appointment.
 *     responses:
 *       200:
 *         description: Appointment details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Appointment details retrieved successfully."
 *               data:
 *                 appointments:
 *                   - _id: "678b232c11cdb49f2b63fb30"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Businsenss Unit"
 *                     displayId: "KC-bnch-2024-AP1000016"
 *                     branchId:
 *                       _id: "67820e34a840f3a7bf1a312d"
 *                       name: "Kosmo Dental Clinic Branch two"
 *                     caseSheetId: null
 *                     token: null
 *                     date: "2025-01-18T00:00:00.000Z"
 *                     caseId: null
 *                     dutyDoctorId:
 *                       _id: "6786505de5226e57fc1618db"
 *                       firstName: "dr1"
 *                       lastName: "br2"
 *                     specialistDoctorId: null
 *                     dentalAssistant:
 *                       _id: "67865084e5226e57fc1618fd"
 *                     slotFrom: "2025-01-18T10:12:00.000Z"
 *                     slotTo: "2025-01-18T10:17:00.000Z"
 *                     chairId:
 *                       _id: "678643c0e5226e57fc160815"
 *                       chairNumber: "Chair 1"
 *                     patientId:
 *                       _id: "678b230cd6ef2ca20e1f98f5"
 *                       firstName: "patient 1"
 *                     status: "Scheduled"
 *                     chiefComplaint: "dssd"
 *                     isActive: true
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy: null
 *                     deletedAt: null
 *                     createdAt: "2025-01-18T03:42:32.933Z"
 *                     updatedAt: "2025-01-18T03:42:32.933Z"
 *                   - _id: "678b23ad11cdb49f2b63fb31"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Businsenss Unit"
 *                     displayId: "KC-bnch-2024-AP1000017"
 *                     branchId:
 *                       _id: "67820e34a840f3a7bf1a312d"
 *                       name: "Kosmo Dental Clinic Branch two"
 *                     caseSheetId: null
 *                     token: null
 *                     date: "2025-01-14T00:00:00.000Z"
 *                     caseId: null
 *                     dutyDoctorId:
 *                       _id: "6786505de5226e57fc1618db"
 *                       firstName: "dr1"
 *                       lastName: "br2"
 *                     specialistDoctorId: null
 *                     dentalAssistant:
 *                       _id: "67865084e5226e57fc1618fd"
 *                     slotFrom: "2025-01-14T00:00:00.000Z"
 *                     slotTo: "2025-01-14T00:20:00.000Z"
 *                     chairId:
 *                       _id: "678643c0e5226e57fc160815"
 *                       chairNumber: "Chair 1"
 *                     patientId:
 *                       _id: "678b2390d6ef2ca20e1f99a7"
 *                       firstName: "Patient 2"
 *                     status: "Scheduled"
 *                     chiefComplaint: "Swelling Large"
 *                     isActive: true
 *                     createdBy: null
 *                     deletedBy: null
 *                     updatedBy: null
 *                     deletedAt: null
 *                     createdAt: "2025-01-18T03:44:42.305Z"
 *                     updatedAt: "2025-01-18T03:44:42.305Z"
 *                 metadata:
 *                   page: 1
 *                   perPage: 2
 *                   totalCount: 53
 *                   totalPages: 27
 *       400:
 *         description: Validation error or missing data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please check the input fields."
 *       404:
 *         description: No appointments found with the specified filters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No appointments found for the specified filters."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */