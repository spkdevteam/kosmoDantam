/**
 * @swagger
 * /api/client/bu/dashboard/caseSheet:
 *   get:
 *     summary: Get Case Sheet Dashboard Data
 *     description: Retrieves case sheet dashboard statistics for a specific client, business unit, branch, and day.
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
 *        
 *         description: Specific day to retrieve dashboard data for (YYYY-MM-DD).
 *         example: "2025-04-28"
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               message: "CaseSheet counts fetched successfully!"
 *               data:
 *                 - Type: "Total Cases"
 *                   value: 1
 *                 - Type: "Proposed"
 *                   value: 0
 *                 - Type: "In Progress"
 *                   value: 0
 *                 - Type: "Completed"
 *                   value: 1
 *                 - Type: "Cancelled"
 *                   value: 0
 *               metaData:
 *                 day: "2025-04-28"
 *                 totalCount: 1
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
