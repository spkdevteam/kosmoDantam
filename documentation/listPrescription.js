/**
 * @swagger
 * /api/client/bu/prescription/listPrescription:
 *   get:
 *     summary: Retrieve a list of prescriptions
 *     description: Fetches a paginated list of prescriptions for a specific patient based on the provided parameters.
 *     tags:
 *       - Prescription
 *     parameters:
 *       - in: query
 *         name: keyWord
 *         schema:
 *           type: string
 *         required: false
 *         description: A keyword to search prescriptions by name or other details.
 *         example: "antibiotics"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: The page number for pagination.
 *         example: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: The number of items per page for pagination.
 *         example: 10
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "67602303890afbdafd0817b5"
 *       - in: query
 *         name: buId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the business unit.
 *         example: "673ef64bdc1355e6ca2e61eb"
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the branch.
 *         example: "67602d00890afbdafd081e2b"
 *       - in: query
 *         name: patientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the patient.
 *         example: "676031bd9a095d01a8811fb3"
 *     responses:
 *       200:
 *         description: A list of prescriptions retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Prescriptions retrieved successfully."
 *               data:
 *                 prescriptions:
 *                   - prescriptionId: "12345"
 *                     patientName: "John Doe"
 *                     doctorName: "Dr. Smith"
 *                     medication: ["Medicine A", "Medicine B"]
 *                     issueDate: "2024-12-01T00:00:00Z"
 *                   - prescriptionId: "67890"
 *                     patientName: "John Doe"
 *                     doctorName: "Dr. Brown"
 *                     medication: ["Medicine X"]
 *                     issueDate: "2024-11-30T00:00:00Z"
 *                 pagination:
 *                   currentPage: 1
 *                   perPage: 10
 *                   totalItems: 25
 *                   totalPages: 3
 *       400:
 *         description: Missing or invalid query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input. Please provide valid query parameters."
 *       404:
 *         description: No prescriptions found for the specified criteria.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No prescriptions found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
