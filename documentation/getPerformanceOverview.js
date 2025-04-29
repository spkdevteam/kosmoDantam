/**
 * @swagger
 * /api/client/bu/dashboard/performance:
 *   get:
 *     summary: Get Dashboard Performance Data
 *     description: Retrieves the performance data including Chair Occupancy Rate, Avg. Inpatient TAT, Registered Employees, and Services Count for a specific client, business unit, branch, and day.
 *     tags:
 *       - Admin Dashboard
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "6782084da840f3a7bf1a2f72"
 *       - in: query
 *         name: buId
 *         schema:
 *           type: string

 *         description: Unique identifier for the business unit.
 *         example: "67820851a840f3a7bf1a307a"
 *       - in: query
 *         name: branchId
 *         schema:
 *           type: string

 *         description: Unique identifier for the branch.
 *         example: "6778e6e7b4f5258830c1c3d4"
 *       - in: query
 *         name: day
 *         schema:
 *           type: string
 *           format: date

 *         description: Specific day to retrieve the performance data for (YYYY-MM-DD).
 *         example: "2025-04-27"
 *     responses:
 *       200:
 *         description: Performance data retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "CaseSheets counts fetched successfully"
 *               data:
 *                 - Module: "Chair"
 *                   Message: "Chair Occupancy Rate"
 *                   value: "50%"
 *                 - Module: "Patient"
 *                   Message: "Avg. Inpatient TAT"
 *                   value: "50 minutes"
 *                 - Module: "Employee"
 *                   Message: "Registered Employees"
 *                   value: "10"
 *                 - Module: "Services"
 *                   Message: "Services Count"
 *                   value: "11"
 *               metaData:
 *                 day: "2025-04-27"
 *                 totalCount: 100
 *       400:
 *         description: Invalid or missing query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 400
 *               message: "Invalid or missing parameters."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
