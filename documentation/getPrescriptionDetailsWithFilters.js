/**
 * @swagger
 * /api/client/bu/prescription/getPrescriptionDetailsWithFilters:
 *   get:
 *     summary: Get prescription details with filters
 *     description: Retrieves prescription details based on various filters such as date range, client, business unit, branch, doctor, and user actions.
 *     tags:
 *       - Prescription
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number for pagination.
 *         example: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of results per page.
 *         example: 5
 *       - in: query
 *         name: searchKey
 *         schema:
 *           type: string
 *         required: false
 *         description: Search term for filtering prescription records.
 *         example: "before"
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "6782084da840f3a7bf1a2f72"
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date for filtering prescriptions.
 *         example: ""
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date for filtering prescriptions.
 *         example: ""
 *       - in: query
 *         name: buId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the business unit.
 *         example: ""
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the branch.
 *         example: ""
 *       - in: query
 *         name: doctorId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the doctor.
 *         example: ""
 *       - in: query
 *         name: patientId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the patient.
 *         example: ""
 *       - in: query
 *         name: caseSheetId
 *         schema:
 *           type: string
 *         required: false
 *         description: Unique identifier for the casesheet.
 *         example: ""
  *       - in: query
 *         name: nextVisitDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Next Visit Date for filtering prescriptions.
 *         example: ""
 *       - in: query
 *         name: createdUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who created the prescription record.
 *         example: ""
 *       - in: query
 *         name: updatedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who last updated the prescription record.
 *         example: ""
 *       - in: query
 *         name: deletedUser
 *         schema:
 *           type: string
 *         required: false
 *         description: ID of the user who deleted the prescription record.
 *         example: ""
 *     responses:
 *       200:
 *         description: Prescription details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Prescription details retrieved successfully."
 *               data:
 *                 prescriptions:
 *                   - _id: "67a821c491c03f67d6c5fd53"
 *                     displayId: "KC-bnch-2024-PR1000017"
 *                     additionalAdvice: null
 *                     branchId:
 *                       _id: "67820e34a840f3a7bf1a312d"
 *                       name: "Kosmo Dental Clinic Branch two"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Business Unit"
 *                     doctorId:
 *                       _id: "67871f6a7bb6b5c411365ff7"
 *                       firstName: "dr2br2"
 *                       lastName: "Doctor"
 *                     drugArray:
 *                       - _id: "67a883492fa30006f21429a1"
 *                         drugName: "Service 3"
 *                         dosage: "2"
 *                         freequency: "0-0-1"
 *                         duration: "3"
 *                         instruction: "afe"
 *                         note: ""
 *                         timing: "once (night)"
 *                       - _id: "67a821c4a72092e6b5d4c0f4"
 *                         drugName: "Paracetamol"
 *                         dosage: "2"
 *                         freequency: "0-1-0"
 *                         duration: "1"
 *                         instruction: "before food"
 *                         note: ""
 *                         timing: "once (afternoon)"
 *                     createdBy: null
 *                     createdAt: "2025-02-09T03:32:20.392Z"
 *                     updatedAt: "2025-02-09T16:31:46.329Z"
 *                   - _id: "67a98be4a4dd6cf0299e0ce1"
 *                     displayId: "KC-bnch-2024-PR1000021"
 *                     additionalAdvice: null
 *                     branchId:
 *                       _id: "67820e34a840f3a7bf1a312d"
 *                       name: "Kosmo Dental Clinic Branch two"
 *                     buId:
 *                       _id: "67820851a840f3a7bf1a307a"
 *                       name: "kasif unit two Business Unit"
 *                     doctorId:
 *                       _id: "6786505de5226e57fc1618db"
 *                       firstName: "dr1"
 *                       lastName: "br2"
 *                     drugArray:
 *                       - _id: "67a98be2e82fc4e4f553dc4d"
 *                         drugName: "Paracetamol"
 *                         dosage: "20"
 *                         freequency: "0-1-0"
 *                         duration: "12"
 *                         instruction: "before food"
 *                         note: "s"
 *                         timing: "once (afternoon)"
 *                     createdBy: null
 *                     createdAt: "2025-02-10T05:17:22.506Z"
 *                     updatedAt: "2025-02-10T05:17:22.506Z"
 *                 pagination:
 *                   page: 1
 *                   perPage: 5
 *                   totalCount: 2
 *                   totalPages: 1
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */