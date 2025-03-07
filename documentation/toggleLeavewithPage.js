/**
 * @swagger
 * /api/client/bu/leave/toggleWithPage:
 *   post:
 *     summary: Toggle the application status and retrieve paginated results.
 *     description: Toggle the status of leave applications and fetch a paginated list of matching applications based on the provided keyword.
 *     tags:
 *       - Leave Management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: string
 *                 description: Unique identifier of the client.
 *                 example: "6735e64c5c58f271b1ce1678"
 *               leaveApplicationId:
 *                 type: string
 *                 description: Unique identifier for the leave application.
 *                 example: "6750583132612884eeb5e00b"
 *               keyWord:
 *                 type: string
 *                 description: Keyword to filter applications (e.g., by reason or type).
 *                 example: "fracture"
 *               page:
 *                 type: integer
 *                 description: Page number for pagination.
 *                 example: 1
 *               perPage:
 *                 type: integer
 *                 description: Number of applications per page.
 *                 example: 5
 *     responses:
 *       200:
 *         description: Paginated list of leave applications with updated statuses.
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
 *                   example: "Applications toggled and retrieved successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       description: Current page number.
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       description: Total number of pages available.
 *                       example: 3
 *                     totalItems:
 *                       type: integer
 *                       description: Total number of matching applications.
 *                       example: 15
 *                     applications:
 *                       type: array
 *                       description: List of applications for the current page.
 *                       items:
 *                         type: object
 *                         properties:
 *                           leaveApplicationId:
 *                             type: string
 *                             description: Unique identifier for the leave application.
 *                             example: "674ff69a32612884eeb5dd27"
 *                           employeeId:
 *                             type: string
 *                             description: Unique identifier of the employee.
 *                             example: "6735e64d5c58f271b1ce168c"
 *                           leaveType:
 *                             type: string
 *                             description: Type of leave (e.g., Casual, Sick).
 *                             example: "Medical"
 *                           startDate:
 *                             type: string
 *                             format: date
 *                             description: Start date of the leave.
 *                             example: "2024-12-01"
 *                           endDate:
 *                             type: string
 *                             format: date
 *                             description: End date of the leave.
 *                             example: "2024-12-07"
 *                           status:
 *                             type: string
 *                             description: Updated status of the application (e.g., Approved, Pending).
 *                             example: "Approved"
 *       400:
 *         description: Validation error or missing/invalid input fields.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Validation error. Please provide all required fields."
 *       404:
 *         description: No matching applications found.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "No applications found for the given keyword."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Internal server error."
 */
