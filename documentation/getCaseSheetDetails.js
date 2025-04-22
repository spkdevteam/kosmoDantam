/**
 * @swagger
 * /api/client/bu/caseSheet/getCaseSheetDetails:
 *   get:
 *     summary: Get CaseSheet Details
 *     description: Retrieves a paginated list of case sheets based on various filters including patient, service, diagnosis, and more.
 *     tags:
 *       - CaseSheet
 *     parameters:
 *       - in: query
 *         name: from_Date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date for filtering case sheet details (YYYY-MM-DD).
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date for filtering case sheet details (YYYY-MM-DD).
 *       - in: query
 *         name: SearchKey
 *         schema:
 *           type: string
 *         required: false
 *         description: Keyword to search in case sheet details.
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
 *         description: Number of records per page.
 *         example: 10
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "6782084da840f3a7bf1a2f72"
 *       - in: query
 *         name: patientId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by patient ID.
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by branch ID.
 *       - in: query
 *         name: buId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by business unit ID.
 *       - in: query
 *         name: createdBy
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by creator user ID.
 *       - in: query
 *         name: compId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by chief complaint ID.
 *       - in: query
 *         name: clinicalFindingsFindId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by clinical finding ID.
 *       - in: query
 *         name: diagnosisFindId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by diagnosis finding ID.
 *       - in: query
 *         name: medicalHistoryFindId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by medical history finding ID.
 *       - in: query
 *         name: deptId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by department ID.
 *       - in: query
 *         name: servId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by service ID.
 *       - in: query
 *         name: procedId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by procedure ID.
 *       - in: query
 *         name: invoiceId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by invoice ID.
 *       - in: query
 *         name: caseSheetId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter by specific case sheet ID.
 *     responses:
 *       200:
 *         description: CaseSheet details retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "CaseSheets details retrieved successfully."
 *               data:
 *                 caseSheets:
 *                   - _id: "67820c87a840f3a7bf1a3114"
 *                     displayId: "KC-CS-2024-000001"
 *                     patientId:
 *                       _id: "6782084da840f3a7bf1a2f80"
 *                       displayId: "PT-000001"
 *                       firstName: "John"
 *                       lastName: "Doe"
 *                     branchId:
 *                       _id: "6782084da840f3a7bf1a2f81"
 *                       name: "Main Branch"
 *                     status: "In Progress"
 *                     drafted: false
 *                     createdAt: "2025-01-11T06:15:35.615Z"
 *                     updatedAt: "2025-01-11T06:15:38.372Z"
 *                 metaData:
 *                   currentPage: 1
 *                   perPage: 10
 *                   SearchKey: ""
 *                   totalDocs: 1
 *                   totalPages: 1
 *                   createdBy:
 *                     - _id: "67eb886ac31f4280a4268ae0"
 *                       firstName: "avishek"
 *                   editedBy: []
 *       400:
 *         description: Missing or invalid input parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 400
 *               message: "Invalid input data. Please check the query parameters."
 *       404:
 *         description: No case sheet details found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 404
 *               message: "No case sheet details found for the specified criteria."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */