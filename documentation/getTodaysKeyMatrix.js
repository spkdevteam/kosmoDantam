/**
 * @swagger
 * /api/client/bu/dashboard/metrics/{clientId}/{buId}/{branchId}/{day}:
 *   get:
 *     summary: Get Dashboard Metrics
 *     description: Retrieves dashboard metrics including Appointment, Registration, Revenue, and Payment for a specific client, business unit, branch, and day.
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
 *         description: Specific day to retrieve dashboard metrics for (YYYY-MM-DD).
 *         example: "2025-04-28"
 *     responses:
 *       200:
 *         description: Dashboard metrics retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 - module: "Appointment"
 *                   Message: "Todays Appointment"
 *                   average: 12
 *                   value: 24
 *                 - module: "Registration"
 *                   Message: "Todays Registration"
 *                   average: 12
 *                   value: 9
 *                 - module: "Revenue"
 *                   Message: "Todays Revenue"
 *                   average: 12
 *                   value: 3240
 *                 - module: "Payment"
 *                   Message: "Todays Payment"
 *                   average: 12
 *                   value: 4240
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
