/**
 * @swagger
 * /api/client/bu/dashboard/graph/{module}/{viewType}/{fromDate}/{toDate}:
 *   get:
 *     summary: Get Dashboard Graph Data
 *     description: Retrieves time-series graph data for a specific module and view type over the given date range.
 *     tags:
 *       - Admin Dashboard
 *     parameters:
 *       - in: path
 *         name: module
 *         schema:
 *           type: string
 *         required: true
 *         description: The module for which graph data is requested (e.g., Appointment, Revenue).
 *         example: "Appointment"
 *       - in: path
 *         name: viewType
 *         schema:
 *           type: string
 *         required: true
 *         description: The view type (e.g., daily, weekly, monthly).
 *         example: "daily"
 *       - in: path
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Start date for the graph data (YYYY-MM-DD).
 *         example: "2025-04-01"
 *       - in: path
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
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
