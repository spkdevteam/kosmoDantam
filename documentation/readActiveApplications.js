 /**
 * @swagger
 * /api/client/bu/leave/readActiveApplications:
 *   get:
 *     summary: Retrieve active leave applications
 *     description: Fetch all active leave applications for a given client ID.
 *     tags:
 *       - Leave Management
 *     parameters:
 *       - in: query
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the client for whom active leave applications need to be fetched.
 *         example: "6735e64c5c58f271b1ce1678"
 *     responses:
 *       200:
 *         description: List of active leave applications.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Success status of the operation.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Active leave applications retrieved successfully."
 *                 data:
 *                   type: array
 *                   description: Array of active leave applications.
 *                   items:
 *                     type: object
 *                     properties:
 *                       leaveApplicationId:
 *                         type: string
 *                         description: Unique identifier for the leave application.
 *                         example: "674ff69a32612884eeb5dd27"
 *                       employeeId:
 *                         type: string
 *                         description: Unique identifier of the employee.
 *                         example: "6735e64d5c58f271b1ce168c"
 *                       leaveType:
 *                         type: string
 *                         description: Type of leave (e.g., Casual, Sick).
 *                         example: "Casual"
 *                       startDate:
 *                         type: string
 *                         format: date
 *                         description: Start date of the leave.
 *                         example: "2024-12-05"
 *                       endDate:
 *                         type: string
 *                         format: date
 *                         description: End date of the leave.
 *                         example: "2024-12-07"
 *       400:
 *         description: Validation error or missing clientId in the query parameters.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please provide a valid clientId."
 *       404:
 *         description: No active leave applications found for the given client ID.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No active leave applications found for the provided clientId."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
