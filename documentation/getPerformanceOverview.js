/**
 * @swagger
 * /api/client/bu/dashboard/performance/{clientId}/{buId}/{branchId}/{day}:
 *   get:
 *     summary: Get Dashboard Performance Data
 *     description: Retrieves the performance data including Chair Occupancy Rate, Avg. Inpatient TAT, Registered Employees, and Services Count for a specific client, business unit, branch, and day.
 *     tags:
 *       - Admin Dashboard
 *     parameters:
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the client.
 *         example: "6782084da840f3a7bf1a2f72"
 *       - in: path
 *         name: buId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the business unit.
 *         example: "BU123"
 *       - in: path
 *         name: branchId
 *         schema:
 *           type: string
 *         required: true
 *         description: Unique identifier for the branch.
 *         example: "BR001"
 *       - in: path
 *         name: day
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Specific day to retrieve the performance data for (YYYY-MM-DD).
 *         example: "2025-04-28"
 *     responses:
 *       200:
 *         description: Performance data retrieved successfully.
 *         content:
 *           application/json:
 *             example:
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
 *                 day: "2025-04-28"
 *                 totalCount: 1
 *       400:
 *         description: Invalid or missing path parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 400
 *               message: "Invalid or missing path parameters."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
