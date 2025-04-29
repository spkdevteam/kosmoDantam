/**
 * @swagger
 * /api/client/bu/dashboard/graph:
 *   get:
 *     summary: Get Dashboard Graph Data
 *     description: Retrieves time-series graph data for a specific module and view type over the given date range.
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
 *         name: module
 *         schema:
 *           type: string

 *         description: The module for which graph data is requested (e.g., Appointment, Revenue).
 *         example: "Appointment"
 *       - in: query
 *         name: viewType
 *         schema:
 *           type: string

 *         description: The view type (e.g., daily, weekly, monthly).
 *         example: "daily"
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date

 *         description: Start date for the graph data (YYYY-MM-DD).
 *         example: "2025-04-01"
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date

 *         description: End date for the graph data (YYYY-MM-DD).
 *         example: "2025-04-07"
 *     responses:
 *       200:
 *         description: Graph data retrieved successfully.
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 - name: "Mon"
 *                   value: 4000
 *                 - name: "Tue"
 *                   value: 3000
 *                 - name: "Wed"
 *                   value: 2000
 *                 - name: "Thu"
 *                   value: 2780
 *                 - name: "Fri"
 *                   value: 1890
 *                 - name: "Sat"
 *                   value: 2390
 *               metaData:
 *                 module: "Appointment"
 *                 viewType: "daily"
 *                 fromDate: "2025-04-01"
 *                 toDate: "2025-04-07"
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
