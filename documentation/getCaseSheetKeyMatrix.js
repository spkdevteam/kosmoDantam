/**
 * @swagger
 * /api/client/bu/dashboard/caseSheet/{clientId}/{buId}/{branchId}/{day}:
 *   get:
 *     summary: Get Case Sheet Dashboard Data
 *     description: Retrieves case sheet dashboard statistics for a specific client, business unit, branch, and day.
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
 *         description: Specific day to retrieve dashboard data for (YYYY-MM-DD).
 *         example: "2025-04-28"
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 - Type: "Total Cases"
 *                   value: 400
 *                 - Type: "Proposed"
 *                   value: "400"
 *                 - Type: "in-Progress"
 *                   value: 40
 *                 - Type: "Completed"
 *                   value: 400
 *                 - Type: "Cancelled"
 *                   value: 100
 *               metaData:
 *                 day: "2025-04-28"
 *                 totalCount: 1
 *             
 *       400:
 *         description: Invalid or missing path parameters.
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
