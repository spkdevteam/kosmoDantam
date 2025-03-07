/**
 * @swagger
 * /api/client/bu/leave/readActiveApplicationswithPage:
 *   get:
 *     summary: Get Active Leave Applications with Pagination
 *     description: Retrieves a paginated list of active leave applications for a specific client. Optionally, filter applications using a keyword.
 *     tags:
 *       - Leave Management
 *     parameters:
 *       - in: query
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         example: "6735e64c5c58f271b1ce1678"
 *         description: Unique identifier of the client.
 *       - in: query
 *         name: keyWord
 *         schema:
 *           type: string
 *           example: "medical leave"
 *         description: Keyword to filter leave applications.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 0
 *           example: 1
 *         description: Page number for pagination (default is 0).
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 5
 *         description: Number of items per page (default is 10).
 *     responses:
 *       200:
 *         description: Successfully retrieved active leave applications.
 *         content:
 *           application/json:
 *             example:
 *               status: true
 *               statusCode: 200
 *               message: "Active leave applications retrieved successfully."
 *               data:
 *                 totalCount: 25
 *                 applications:
 *                   - applicationId: "application123"
 *                     employeeName: "John Doe"
 *                     leaveType: "Medical Leave"
 *                     startDate: "2024-12-01"
 *                     endDate: "2024-12-05"
 *                     status: "Active"
 *                   - applicationId: "application124"
 *                     employeeName: "Jane Smith"
 *                     leaveType: "Annual Leave"
 *                     startDate: "2024-12-02"
 *                     endDate: "2024-12-04"
 *                     status: "Active"
 *       400:
 *         description: Invalid input data.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 400
 *               message: "Invalid input data. Please verify the details."
 *       404:
 *         description: No active leave applications found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 404
 *               message: "No active leave applications found."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               statusCode: 500
 *               message: "Internal server error."
 */
