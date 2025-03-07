/**
 * @swagger
 * /api/client/bu/patient/searchPatient:
 *   get:
 *     summary: Retrieve a list of patients
 *     description: Fetches a paginated list of patients for a specific client, filtered by name, contact number, or email if provided.
 *     tags:
 *       - Patients
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "6753e5e4b403a31c6f098826"
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Patient name to search for.
 *         example: "John Doe"
 *       - in: query
 *         name: contactNumber
 *         schema:
 *           type: string
 *         required: false
 *         description: Patient's contact number to search for.
 *         example: "1234567890"
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: false
 *         description: Patient's email address to search for.
 *         example: "john.doe@example.com"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: The page number for pagination.
 *         example: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: The number of records to retrieve per page.
 *         example: 10
 *     responses:
 *       200:
 *         description: A paginated list of patients.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "Patients retrieved successfully."
 *               data:
 *                 patients:
 *                   - patientId: "PAT001"
 *                     name: "John Doe"
 *                     contactNumber: "1234567890"
 *                     email: "john.doe@example.com"
 *                   - patientId: "PAT002"
 *                     name: "Jane Smith"
 *                     contactNumber: "9876543210"
 *                     email: "jane.smith@example.com"
 *                 pagination:
 *                   totalRecords: 25
 *                   totalPages: 3
 *                   currentPage: 1
 *                   perPage: 10
 *       400:
 *         description: Validation error or missing required query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Invalid input. Please provide a valid clientId."
 *       404:
 *         description: No patients found for the specified criteria.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No patients found for the given criteria."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
