/**
 * @swagger
 * /api/client/bu/dashboard/metrics:
 *   get:
 *     summary: Get Dashboard Metrics
 *     description: Retrieves dashboard metrics including Appointment, Registration, Revenue, and Payment for a specific client, business unit, branch, and day.
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
 
 *         description: Specific day to retrieve dashboard metrics for (YYYY-MM-DD).
 *         example: "2025-04-28"
 *     responses:
 *       200:
 *         description: Dashboard metrics retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "CaseSheets counts fetched successfully"
 *               data:
 *                 - module: "Appointment"
 *                   Message: "Today's Appointment"
 *                   average: 12
 *                   value: 24
 *                 - module: "Registration"
 *                   Message: "Today's Registration"
 *                   average: 12
 *                   value: 9
 *                 - module: "Revenue"
 *                   Message: "Today's Revenue"
 *                   average: 12
 *                   value: 3240
 *                 - module: "Payment"
 *                   Message: "Today's Payment"
 *                   average: 12
 *                   value: 4240
 *               metaData:
 *                 module: "Appointment"
 *                 viewType: "daily"
 *                 fromDate: "2025-04-27"
 *                 toDate: "2025-04-28"
 *       400:
 *         description: Invalid or missing query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 400
 *               message: "Invalid or missing query parameters."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
